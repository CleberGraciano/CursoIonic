import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  //URL: http://localhost/pedidos/page/login_ionic
  constructor(public navCtrl: NavController) {
  }
  
}
