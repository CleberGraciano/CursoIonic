import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the FazerpedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-fazerpedido',
  templateUrl: 'fazerpedido.html',
})
export class FazerpedidoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ngOnInit(){
    console.log(sessionStorage.getItem('usuarioId'));
    console.log(sessionStorage.getItem('usuarioLogado'));
    if(sessionStorage.getItem('flagLogado')!="sim"){
      this.goToLogin();
    }

  }

  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
 

}
