import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(){
    let cartId = await this.getOrCreateCartId()
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges();
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

  async addToCart(product) {
    this.updateItemQuantity(product,1);
  }

  async removeFromCart(product){
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product, change:number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$.valueChanges().pipe(take(1)).subscribe(item => {
      item$.update({
        product: product.payload.val(),
        quantity: (item? item['quantity'] : 0) +change
      })
    })
  }
}
