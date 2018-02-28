import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Usuario } from '../../domain/usuario/usuario';
import { MinhaContaPage } from '../minha-conta/minha-conta'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


  public data;
  public http;
  public usuario: Usuario;
  //public usuarioLogado: Usuario;
  

 
  constructor(
    public navCtrl: NavController,
    http: Http) {

      this.data = {};
        this.data.response = '';
        this.http = http;
        this.usuario = new Usuario (null, null, null, null);
  }

  submit(){
    var link = 'http://localhost/pedidos/page/login_ionic';
    var data = JSON.stringify({ email: this.usuario.email, password: this.usuario.password });
    
    // Iniciando a conexão HTTP para cadastro via JSON
    this.http.post(link, data)
      .subscribe( data => {
        this.data.response = data._body;
     
        var res = this.data.response.split("|");
        if(res[1] == "sucesso"){
       sessionStorage.setItem("usuarioId", res[0]);
       sessionStorage.setItem("usuarioLogado", this.usuario.email);
       sessionStorage.setItem("flagLogado", "sim");
          this.navCtrl.push(MinhaContaPage)
        }else 
         if(this.data.response == "invalido"){

          console.log("Login ou senha Invalido");
         
        }

      }, error =>{
        console.log("Ocorreu algum erro!");
      });

  }
  
}
