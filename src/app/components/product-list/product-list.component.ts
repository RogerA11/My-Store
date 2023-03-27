import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/product';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Products[] = [];
  cart: Products[] = [];
  selectedQuantity: number = 1;
  selectedProduct: Products | null = null;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getData().subscribe(data => {
      this.products = data;
      console.log('Data retrieved successfully:', this.products);
    })
  };

  addToCart(product: Products, quantity: number) {
    const productIndex = this.cart.findIndex(p => p.id === product.id);
    if (productIndex > -1) {
      this.cart[productIndex].quantity += quantity
    } else {
      const cartProduct = { ...product, quantity };
      this.cart.push(cartProduct);
    }
    alert('Added to cart!');
  }
  
  onProductClick(product: Products): void {
    this.selectedProduct = {...product};
  }
};


