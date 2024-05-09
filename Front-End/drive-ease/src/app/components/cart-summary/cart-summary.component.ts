import { CarDetail } from 'src/app/models/entities/car-detail';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from './../../models/entities/cart-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  providers: [MessageService],
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems:CartItem[] = [];

  constructor(private cartService:CartService,
              private messageService:MessageService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartItems = this.cartService.listCart();
  }

  removeFromCart(car:CarDetail){
    this.cartService.removeFromCart(car);
    this.messageService.add({severity:'success', summary: 'Success', detail: car.carName + " deleted from cart."});

  }

}
