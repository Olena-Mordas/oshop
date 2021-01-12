import { ShoppingCart } from "./shopping-cart";

export class Order{
    dataPlaced: number;
    items: any[];

    constructor(public userId: string, public shipping: any, shoppincCart: ShoppingCart){
        
        this.dataPlaced = new Date().getTime();
        this.items = shoppincCart.items.map(i=>{
            return {
              product:{
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            }
          })
    }
}