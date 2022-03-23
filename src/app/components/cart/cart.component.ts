import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.cartDetails();
    this.loadCart();
    this.totalCartNumber();
  }
  
  getCartDetails: any = [];
  cartDetails() {
    if(localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || '{}');
    }
  }

  incQnt(prodId: number, quantity: any) {
    for(let i = 0; i < this.getCartDetails.length; i++){
      if(this.getCartDetails[i].prodId === prodId && quantity != 9) {
        this.getCartDetails[i].quantity = parseInt(quantity) + 1;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.totalCartNumber();
    this.loadCart();
  }

  decQnt(prodId: number, quantity: any) {
    for(let i = 0; i < this.getCartDetails.length; i++){
      if(this.getCartDetails[i].prodId === prodId && quantity != 1) {
        this.getCartDetails[i].quantity = parseInt(quantity) - 1;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.totalCartNumber();
    this.loadCart();
  }
  

  total: number = 0;
  loadCart() {
    if(localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || '{}');
      this.total = this.getCartDetails.reduce(function(acc: any, val: any){
        return acc + (val.amount * val.quantity);
      },0);
    }
  }

  removeItem(cartProduct: any) {
    if(localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || "{}");
      for(let i = 0; i < this.getCartDetails.length; i++) {
        if(this.getCartDetails[i].prodId === cartProduct.prodId) {
          this.getCartDetails.splice(i, 1);
          localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
          this.loadCart();
          this.totalCartNumber();
        }
      }
    }
  }

  removeAll() {
    localStorage.removeItem('localCart');
    this.getCartDetails = [];
    this.total = 0;
    this.cartNumber = 0;
    this.auth.cartSubject.next(this.cartNumber);
  }

  cartNumber: number = 0;
  
  totalCartNumber() {
    var cartValue = JSON.parse(localStorage.getItem('localCart') || '{}');
    this.cartNumber = cartValue.length;
    var cartTotalQuantity: number = 0;
    for (let i = 0; i < cartValue.length; i++) {
      cartTotalQuantity += cartValue[i].quantity;
    }
    this.auth.cartSubject.next(cartTotalQuantity);
  }

  checkOut: boolean = false;

  checkoutBox() {
    this.checkOut = true;
  }

  goBack() {
    this.checkOut = false;
  }

  submitCheckout(){
    this.removeAll();
    this.checkOut = false;
  }
}
