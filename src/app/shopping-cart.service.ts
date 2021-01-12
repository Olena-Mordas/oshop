import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { take,map } from 'rxjs/operators';

import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(){
    let cartId = await this.getOrCreateCartId()
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
    .pipe(map(x=> new ShoppingCart(x.payload.val()['items'] || {} )));
  }

  async addToCart(product) {
    this.updateItem(product,1);
  }

  async removeFromCart(product){
    this.updateItem(product, -1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId():Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let res = await this.create();
    localStorage.setItem('cartId', res.key);
    return res.key;

  }

  private async updateItem(product, change:number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$.valueChanges().pipe(take(1)).subscribe(item => {
      item$.update({
        //product: product.payload.val(),
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: (item? item['quantity'] : 0) +change
      })
    })
  }

}
