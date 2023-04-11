import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/product';
import { HttpService } from 'src/app/services/http.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router'; // Add this import

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Products[] = [];
  selectedQuantities: { [key: number]: number } = {};

  constructor(private httpService: HttpService, private cartService: CartService, private router: Router) { } // Add router here

  ngOnInit(): void {
    this.httpService.getData().subscribe(data => {
      this.products = data;
      this.setInitialQuantities(); // Set default quantities after data is fetched
      console.log('Data retrieved successfully:', this.products);
    });
  }

  setInitialQuantities(): void {
    this.products.forEach(product => {
      this.selectedQuantities[product.id] = 1;
    });
  }

  addToCart(event: { product: Products; quantity: number }) {
    this.cartService.addToCart(event.product, event.quantity);
  }

  // Add this method
  onProductClicked(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
}
