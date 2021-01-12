export class Product{
    key: string;
    category: string;
    imageUrl: string;
    price: number;
    title: string;

    constructor(init?: Partial<Product>){
        Object.assign(this, init);
    }

}