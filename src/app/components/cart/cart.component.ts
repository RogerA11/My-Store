import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from 'src/app/services/cart.service';
import { Products, productCount } from '../../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  productCount: string[] = productCount;
  totalPrice: number = 0;
  name: string = '';
  address: string = '';
  ccnum: string = '';
  selectedQuantity: number = 1;
  cartSubscription!: Subscription; 

  constructor(private cartService: CartService, private route: Router) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartProduct();
    this.calculateTotalPrice();
    // Subscribe to the currentCart Observable
    this.cartSubscription = this.cartService.currentCart.subscribe(cart => {
      this.cartItems = cart;
      this.calculateTotalPrice();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the Observable
    this.cartSubscription.unsubscribe();
  }

  selectChange(id: number, event: any, selectedQuantity: number): void {
    const selectedOption = event.target.quantity[event.target.quantity.selectedIndex].value;
    const product = this.cartItems.find(cartItem => cartItem.product.id === id)?.product;
    if (product) {
      this.cartService.addToCart(product, selectedQuantity);
      this.calculateTotalPrice();
    }
  }

  removeFromCart(id: number): void {
    const updatedCart = this.cartItems.filter(cartItem => cartItem.product.id !== id);
    this.cartItems = updatedCart;
    this.cartService.updateCart(updatedCart);
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((acc: number, cartItem: CartItem) => {
      return acc + cartItem.product.price * cartItem.quantity;
    }, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }

  nameChanged(arg: any) {
    this.name = arg;
  }

  addressChanged(arg: any) {
    this.address = arg;
  }

  ccnumChanged(arg: any) {
    this.ccnum = arg;
  }

  submitOrder(): void {
    this.cartService.clearCart();
    this.route.navigateByUrl(`confirmation/${this.name}/${this.totalPrice}`);
  }
}

