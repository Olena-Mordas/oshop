export class ShoppingCartItem{

    title: string;
    imageUrl:string;
    price: number;
    key:string;
    quantity: number;

    constructor(init?: Partial<ShoppingCartItem>){
        Object.assign(this, init);
    }

    get totalPrice(){return this.price* this.quantity}
}