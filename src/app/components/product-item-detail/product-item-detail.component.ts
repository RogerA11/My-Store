import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/models/product';
import { HttpService } from 'src/app/services/http.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  product: Products = new Products;
  products: Products[] = [];
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.httpService.getData().subscribe(data => {
      this.products = data;
      this.route.paramMap.subscribe(params => {
        const productId = params.get('id');
        if (productId) {
          const id = parseInt(productId, 10);
          const product = this.products.find(p => p.id === id);
          if (product) {
            this.product = product;
          } else {
            // Handle the case when the product is not found, e.g., navigate to a "Not Found" page or show an error message.
          }
        } else {
          // Handle the case when the 'id' parameter is not present, e.g., navigate to a "Not Found" page or show an error message.
        }
      });
    });
  }

  addToCart(product: Products, quantity: number) {
    this.cartService.addToCart(product, quantity);
    alert('Added to cart!');
  }
}
