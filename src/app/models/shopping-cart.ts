import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart{

    dateCreated: number;
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: {[productId:string]: ShoppingCartItem}){
        for (let productId in itemsMap){
            let item = itemsMap[productId]
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
     }

    get totalItemCount() {
        let count = 0;
        for (let productId in this['items'])
            count += this['items'][productId].quantity;
        return count;
    }

    get productIds(){
        return Object.keys(this.items);
    }

    get totalPrice(){
        let sum = 0;
        for (let productId in this['items'])
            sum += this['items'][productId].totalPrice;
        return sum;
        
    }

    getQuantity(product){
        let item=this.itemsMap[product.key];
        return item? item.quantity : 0;
      }
}