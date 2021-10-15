import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { AuthenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name: string;
  dp: string;
  cart: Array<any> = [];
  userEmail: string;
  constructor(public nav: NavController, private authService: AuthenticateService) {


    //this.name = localStorage.getItem("name");
    //this.phoneNumber = localStorage.getItem("phoneNumber");
    this.dp = this.dp = "https://ui-avatars.com/api/?background=ff7f50" + "&color=ffffff&size=128&bold=true&name=" + this.name;

    if (localStorage.getItem("carts")) {
      this.cart = JSON.parse(localStorage.getItem("carts"));
    }

    //Keep track of CART DATA
    setInterval(() => {
      if (localStorage.getItem("carts")) {
        this.cart = JSON.parse(localStorage.getItem("carts"));
      }
    }, 500);
  }

  ngOnInit() {
    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.nav.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })
  }
 
  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.nav.navigateBack('/login');
      })
      .catch(error => {
        console.log(error);
      })
  }

  viewCart() {
    this.nav.navigateForward("/cart");
  }

}
 