import { Component, OnInit, Input } from '@angular/core';
import { Products } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  @Input() product: Products = new Products;
  cart: Products[] = [];
  selectedQuantity: number = 1;

  constructor() {
    this.product = {
    id: 0,
    name: '',
    price: 1,
    url: '',
    description: '',
    quantity: 0
    }
  }

  ngOnInit(): void {}

  addToCart(product: Products, quantity: number) {
    const productIndex = this.cart.findIndex(p => p.id === product.id);
    if (productIndex > -1) {
      this.cart[productIndex].quantity += quantity
    } else {
      const cartProduct = { ...product, quantity };
      this.cart.push(cartProduct);
    }
    alert('Added to cart!')
  }
}
