export class Products {
    id: number;
    name: string;
    price: number;
    url: string;
    description: string;
    quantity: number;

constructor() {
    this.id = 1;
    this.name = '';
    this.price = 1;
    this.url = '';
    this.description = '';
    this.quantity = 0;
    }
}

export const productCount: string[] = ["1", "2", "3", "4", "5"];