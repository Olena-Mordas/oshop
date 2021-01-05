import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';

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

  async getCart() {
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
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$.valueChanges().pipe(take(1)).subscribe(item => {
      item$.update({
        product: product.payload.val(),
        quantity: (item? item['quantity'] : 0) + 1
      })
    })
  }
}
