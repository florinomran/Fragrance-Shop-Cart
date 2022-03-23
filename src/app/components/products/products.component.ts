import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.totalCartNumber();
    this.auth.search.subscribe(val => {
      this.searchKey = val;
    });
    this.filterAllProducts();
  }

  searchKey: string = "";

  productArray = [
    {
      prodId: 1,
      img: "../../../assets/products_img/p1.png",
      amount: 900,
      quantity: 1,
      category: "niche",
      topSeller: false,
      stock: 9,
      alt: "Angel's Share by Kilian X French Montana"
    },
    {
      prodId: 2,
      img: "../../../assets/products_img/p2.png",
      amount: 1100,
      quantity: 1,
      category: "niche",
      topSeller: false,
      stock: 9,
      alt: "Initio Side Effect"
    },
    {
      prodId: 3,
      img: "../../../assets/products_img/p3.png",
      amount: 1200,
      quantity: 1,
      category: "niche",
      topSeller: false,
      stock: 9,
      alt: "Xerjoff Naxos"
    },
    {
      prodId: 4,
      img: "../../../assets/products_img/p4.png",
      amount: 550,
      quantity: 1,
      category: "designer",
      topSeller: false,
      stock: 9,
      alt: "Dior Homme Parfum"
    },
    {
      prodId: 5,
      img: "../../../assets/products_img/p5.png",
      amount: 1450,
      quantity: 1,
      category: "niche",
      topSeller: false,
      stock: 9,
      alt: "Amouage Enclave"
    }
    ,
    {
      prodId: 6,
      img: "../../../assets/products_img/p6.png",
      amount: 330,
      quantity: 1,
      category: "designer",
      topSeller: false,
      stock: 9,
      alt: "Le Male Le Parfum Jean Paul Gaultier"
    },
    {
      prodId: 7,
      img: "../../../assets/products_img/p7.png",
      amount: 800,
      quantity: 1,
      category: "niche",
      topSeller: true,
      stock: 9,
      alt: "Tobacco Vanille Tom Ford"
    },
    {
      prodId: 8,
      img: "../../../assets/products_img/p8.png",
      amount: 1400,
      quantity: 1,
      category: "niche",
      topSeller: true,
      stock: 9,
      alt: "Baccarat Rouge 540 Maison Francis Kurkdjian"
    },
    {
      prodId: 9,
      img: "../../../assets/products_img/p9.png",
      amount: 1250,
      quantity: 1,
      category: "niche",
      topSeller: true,
      stock: 9,
      alt: "Creed Aventus"
    },
    {
      prodId: 10,
      img: "../../../assets/products_img/p10.png",
      amount: 1000,
      quantity: 1,
      category: "niche",
      topSeller: false,
      stock: 9,
      alt: "Nishane Ani"
    },
    {
      prodId: 11,
      img: "../../../assets/products_img/p11.png",
      amount: 320,
      quantity: 1,
      category: "designer",
      topSeller: false,
      stock: 9,
      alt: "La Belle Le Parfum Jean Paul Gaultier"
    },
    {
      prodId: 12,
      img: "../../../assets/products_img/p12.png",
      amount: 550,
      quantity: 1,
      category: "designer",
      topSeller: true,
      stock: 9,
      alt: "Dior Sauvage Elixir"
    },
    {
      prodId: 13,
      img: "../../../assets/products_img/p13.png",
      amount: 360,
      quantity: 1,
      category: "designer",
      topSeller: false,
      stock: 9,
      alt: "Spicebomb Extreme Viktor&Rolf"
    },
    {
      prodId: 14,
      img: "../../../assets/products_img/p14.png",
      amount: 220,
      quantity: 1,
      category: "designer",
      topSeller: false,
      stock: 9,
      alt: "Toy Boy Moschino"
    },
    {
      prodId: 15,
      img: "../../../assets/products_img/p15.png",
      amount: 280,
      quantity: 1,
      category: "designer",
      topSeller: false,
      stock: 9,
      alt: "The One for Men Eau de Parfum Dolce&Gabbana"
    },
    {
      prodId: 16,
      img: "../../../assets/products_img/p16.png",
      amount: 280,
      quantity: 1,
      category: "designer",
      topSeller: false,
      stock: 9,
      alt: "Bleu de Chanel Eau de Parfum"
    }
  ];



  inc(product:any) {
    if(product.quantity != 9){
      product.quantity++;
    }
  }
  dec(product:any) {
    if(product.quantity != 1){
    product.quantity--;
    }
  }

  itemsCart:any = [];
  addToCart(product:any) {
    let cartDataNull = localStorage.getItem('localCart');
    if(cartDataNull == null) {
      let storeDataGet:any = [];
      storeDataGet.push(product);
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    } else {
      var id = product.prodId;
      let index:number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart') || '{}');
      for(let i = 0; i < this.itemsCart.length; i++) {
        if(parseInt(id) === parseInt(this.itemsCart[i].prodId)) {
          this.itemsCart[i].quantity = product.quantity;
          index = i;
          break;
        }
      }
      if(index == -1) {
        this.itemsCart.push(product);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      } else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.totalCartNumber();
  }


  filerCategory: any;

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

  filterCateg(category: string) {
    this.filerCategory = this.productArray.filter((a: any) => {
      if(a.category == category || category == '') {
        return a;
      }
    });
  }

  filterTS() {
    this.filerCategory = this.productArray.filter((a: any) => {
      if(a.topSeller == true) {
        return a;
      }
    });
  }

  filterAllProducts() {
    this.filerCategory = this.productArray.filter((a: any) => {
      if(a.stock != 0) {
        console.log("aaa")
        return a;
      }
    });
  }

}
