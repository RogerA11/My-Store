
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../models/product';

export interface CartItem {
  product: Products;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];
  private storage = window.localStorage;

  // Create a BehaviorSubject with an initial value of an empty array
  private _currentCart = new BehaviorSubject<CartItem[]>([]);
  // Expose the BehaviorSubject as an Observable
  currentCart = this._currentCart.asObservable();

  constructor() {
    const cart = this.storage.getItem('cart');
    if (cart) {
      this.cart = JSON.parse(cart);
      this._currentCart.next(this.cart);
    }
  }

  addToCart(product: Products, quantity: number) {
    const productIndex = this.cart.findIndex((p) => p.product.id === product.id);
    if (productIndex > -1) {
      this.cart[productIndex].quantity += quantity;
    } else {
      const cartProduct: CartItem = { product, quantity };
      this.cart.push(cartProduct);
    }
    this.storage.setItem('cart', JSON.stringify(this.cart));
    console.log('Cart content:', this.cart);
    alert('Added to cart!');
    this._currentCart.next(this.cart);
  }

  getCartProduct(): CartItem[] {
    return this.cart;
  }

  updateCart(cartItems: CartItem[]): void {
    this.cart = cartItems;
    this.storage.setItem('cart', JSON.stringify(this.cart));
    this._currentCart.next(this.cart);
  }

  clearCart(): void {
    this.cart = [];
    this.storage.removeItem('cart');
    this._currentCart.next(this.cart);
  }
}
