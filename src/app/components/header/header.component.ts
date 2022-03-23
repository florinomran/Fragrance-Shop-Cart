import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  search = 0;

  constructor(private auth: AuthService, public _router: Router) { 
    this.auth.cartSubject.subscribe((data) => {
      this.cartItem = data;
    });
  }

  ngOnInit(): void {
    
  }

  cartItem:number = 0;

  totalCartItems() {
    if(localStorage.getItem('localCart') != null) {
      var cartCount = JSON.parse(localStorage.getItem('localCart') || '{}');
      this.cartItem = cartCount.length;
    }
  }

  searchTerm: string = "";
  searchItem(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.auth.search.next(this.searchTerm);
  }

  // Toggle menu on devices with max-width: 998px
  menuVariable: boolean = false;
  menuX: boolean = false;
  menuToggle() {
    this.menuVariable =! this.menuVariable;
    this.menuX =! this.menuX;
  }

}
