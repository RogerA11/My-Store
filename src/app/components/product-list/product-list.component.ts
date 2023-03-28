import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/product';
import { HttpService } from 'src/app/services/http.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Products[] = [];
  selectedQuantity: number = 1;

  constructor(private httpService: HttpService, private cartService: CartService) { }

  ngOnInit(): void {
    this.httpService.getData().subscribe(data => {
      this.products = data;
      console.log('Data retrieved successfully:', this.products);
    })
  };

  addToCart(product: Products, quantity: number) {
    this.cartService.addToCart(product, quantity);
  }
}