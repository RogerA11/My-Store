import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Products } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Products;
  @Input() showDetails: boolean = false;
  @Input() showDescription: boolean = false;
  @Output() addToCartClicked = new EventEmitter<{ product: Products; quantity: number }>();
  @Output() productClicked = new EventEmitter<void>(); // Add this line

  selectedQuantity: number = 1;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(product: Products, selectedQuantity: number): void {
    this.cartService.addToCart(product, selectedQuantity);
  }

  onProductNameClick(event: MouseEvent): void {
    if (!this.showDetails) {
      event.stopPropagation();
      this.productClicked.emit();
    }
  }
}
