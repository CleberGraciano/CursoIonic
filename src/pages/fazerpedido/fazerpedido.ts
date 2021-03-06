import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Jsonp } from '@angular/http';
import { LoginPage } from '../login/login';
import { Cardapio } from '../../domain/cardapio/cardapio'
import { Pedido } from '../../domain/pedido/pedido'
//import { Usuario } from '../../domain/usuario/usuario';
import { PedidosPage } from '../pedidos/pedidos';



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

  public cardapio: Cardapio;
  public data;
  public http;
  public url: string;
  public pedido: Pedido;


  constructor(
    public navCtrl: NavController, 
    public _alertCtrl: AlertController,
    http: Http, 
    public navParams: NavParams) {
   // this.cardapio = this.navParams.get('cardapioSelecionado');
    this.pedido = new Pedido(null,null,null,null,null,null,null,null);
    this.pedido.cardapio = this.navParams.get('cardapioSelecionado');
    this.http = http;
    this.data = {};
    this.data.response = '';
    this.url = "http://localhost/pedidos/page/cadastrar_pedido_ionic";
  
  }

  ngOnInit(){
    console.log(sessionStorage.getItem('usuarioId'));
    console.log(sessionStorage.getItem('usuarioLogado'));
   // this.pedido.usuario = new Usuario(sessionStorage.getItem('usuarioId'),"Cleber Graciano",sessionStorage.getItem('usuarioLogado'),null,null);
    if(sessionStorage.getItem('flagLogado')!="sim"){
      this.goToLogin();
    }

  }

  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  goToPedidos(){
    this.navCtrl.setRoot(PedidosPage);
}

  submit(){
    var data = JSON.stringify({
    cardapioId: this.pedido.cardapio.id,
    usuarioId: sessionStorage.getItem('usuarioId'),
    valor: this.pedido.cardapio.preco,
    taxaEntrega: "10.00",
    nome: "Cleber Graciano",
    email: sessionStorage.getItem('usuarioLogado'),
    observacao: this.pedido.observacao
  });
//Redirecionar após o pedido com sucesso para a página pedidos
  this.http.post(this.url, data)
  .subscribe(data => {

    //Comando responsavél para obeter a resposta do Servidor 
    this.data.response = data._body;

    //Exibe uma alerta de Sucesso na conexão caso ele encontre o Json carregado
    this._alertCtrl
    .create({
      title: 'Sucesso',
      buttons: [{ text: 'OK' }],
      subTitle: this.data.response
    }).present();

    this.goToPedidos(); // Redireciona para pagina de pedidos 

    // Caso de algo erro na conexão exibe um alert de erro 
  }, error => {
    console.log("Oooooops!");
    this._alertCtrl
    .create({
     title: 'Falha na conexão!',
    buttons: [{ text: 'Estou ciente!' }],
    subTitle: 'Não foi possivél obter a lista de restaurante. Tente novamente.'}).present();
  });

  console.log(data);
 
  }

  //-------------- Criar a função goToLogin e  goToPedidos

 
 
}
