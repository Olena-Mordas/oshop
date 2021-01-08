export class ShoppingCartItem{

    title: string;
    imageUrl:string;
    price: number;
    key:string;
    quantity: number;

    //constructor(public product, public quantity:number){ }

    get totalPrice(){return this.price* this.quantity}
}