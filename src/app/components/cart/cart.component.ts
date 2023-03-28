import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Products, productCount } from '../../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Products[] = [];
  productCount: string[] = productCount;
  totalPrice: number = 0;
  name: string = '';
  address: string = '';
  ccnum: string = '';
  selectedQuantity: number = 1;

  constructor(private cartService: CartService, private route: Router) { }

  ngOnInit(): void {
    this.products = this.cartService.getCartProduct();
    this.calculateTotalPrice();
  }

  selectChange(id: number, event: any, selectedQuantity: number): void {
    const selectedOption = event.target.quantity[event.target.quantity.selectedIndex].value;
    const product = this.products.find(prod => prod.id === id);
    if (product) {
      this.cartService.addToCart(product, selectedQuantity);
      this.calculateTotalPrice();
    }
  }

removeFromCart(id: number): void {
  // Get the current cart
  const currentCart = this.cartService.getCartProduct();

  // Remove the product with the given id from the cart
  const updatedCart = currentCart.filter(product => product.id !== id);

  // Update the cart in local storage
  localStorage.setItem('cart', JSON.stringify(updatedCart));
}

  
  removeCart(id: number): void {
    const cartIdx = this.products ? this.products.findIndex(cart => cart.id === id) : -1;
    if (cartIdx != -1 && this.products.length > 0) {
      this.products.splice(cartIdx, 1);
      this.cartService.clearCart();
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.products.reduce((acc: number, val: any) => {
      return acc + val.price * Number(val.quantity);
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
    // Submit the order and clear the cart
    this.cartService.clearCart();
    this.route.navigateByUrl(`success/${this.name}/${this.totalPrice}`);
  }
}
