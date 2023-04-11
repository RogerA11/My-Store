import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/models/product';
import { HttpService } from 'src/app/services/http.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  @Input() product: Products = new Products;
  selectedQuantity: number = 1;

  @Output() addToCartClicked = new EventEmitter<{ product: Products; quantity: number }>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.httpService.getData().subscribe(data => {
      this.route.paramMap.subscribe(params => {
        const productId = params.get('id');
        if (productId) {
          const id = parseInt(productId, 10);
          const product = data.find((p: Products) => p.id === id);
          if (product) {
            this.product = product;
          } else {
            // Handle the case when the product is not found
          }
        } else {
          // Handle the case when the productId is not provided
        }
      });
    });
  }

  addToCart(product: Products, quantity: number) {
    this.addToCartClicked.emit({ product, quantity });
  }
}
