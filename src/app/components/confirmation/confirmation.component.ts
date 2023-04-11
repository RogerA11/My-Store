import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  name: string = '';
  totalPrice: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService) { }
  
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.name = params.get('name') || '';
      this.totalPrice = Number(params.get('totalPrice')) || 0;
      console.log('Name:', this.name, 'Total Price:', this.totalPrice);
      this.cartService.clearCart(); // Clear the cart here.
    });
  }
  
  
  emptyCart(): void {
    this.cartService.clearCart();
  }

  returnToProductList(): void {
    this.router.navigate(['product-list']);
  }
}
