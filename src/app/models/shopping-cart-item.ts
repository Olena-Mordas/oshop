export class ShoppingCartItem{

    constructor(public product, public quantity:number){ }

    get totalPrice(){return this.product.price* this.quantity}
}