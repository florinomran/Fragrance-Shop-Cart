import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.totalCartNumber();
  }

  images = [1, 2, 3, 4].map((n) => `../../../assets/carousel/slide${n}.jpg`);

  cartNumber:number = 0;
  totalCartNumber() {
    var cartValue = JSON.parse(localStorage.getItem('localCart') || '{}');
    this.cartNumber = cartValue.length;
    var cartTotalQuantity: number = 0;
    for (let i = 0; i < cartValue.length; i++) {
      cartTotalQuantity += cartValue[i].quantity;
    }
    this.auth.cartSubject.next(cartTotalQuantity);
  }

}
