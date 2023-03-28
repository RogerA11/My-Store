import { Injectable } from '@angular/core';
import { Products } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Products[] = [];

  storage = window.localStorage;

  constructor() { }

  addToCart(product: Products, quantity: number) {
    const productIndex = this.cart.findIndex(p => p.id === product.id);
    if (productIndex > -1) {
      this.cart[productIndex].quantity += quantity;
    } else {
      const cartProduct = { ...product, quantity };
      this.cart.push(cartProduct);
    }
    console.log('Cart content:', this.cart);
    alert('Added to cart!');
  }
   
  getCartProduct(): Products[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  clearCart(): void {
    localStorage.removeItem('cart');
  }
  
}
