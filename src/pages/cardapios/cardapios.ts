import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Restaurante } from '../../domain/restaurante/restaurante';
import { Cardapio } from '../../domain/cardapio/cardapio';
import { FazerpedidoPage } from '../fazerpedido/fazerpedido';


@Component({
    selector: 'page-cardapios',
    templateUrl: 'cardapios.html'
  })

  export class CardapiosPage{

    public restaurante: Restaurante;
    public url: string;
    public cardapios: Cardapio[];
    
    constructor(
      public navCtrl: NavController,
      private _http: Http,
      private _alertCtrl: AlertController,
      private loadingCtrl: LoadingController,
      public navParams: NavParams
      

    ){

      this.restaurante = this.navParams.get('restauranteSelecionado');
      console.log(this.restaurante.nome);
      this.url = "http://localhost/pedidos/page/get_ionic_cardapio_json/"+this.restaurante.id;

    }

    ngOnInit(){
      let loader = this.loadingCtrl.create({
        content: 'Buscando cardapio. Aguarde...'
      });
      loader.present();
      this._http
          .get(this.url)
          .map( res => res.json())
          .toPromise()
          .then( cardapios => {
              this.cardapios = cardapios;
              loader.dismiss();
          })
          .catch(erro =>{
            console.log(erro);
            loader.dismiss();
            this._alertCtrl
              .create({
                title: 'Falha na Conexão',
                buttons: [{ text: 'Ok estou ciente!' }],
                subTitle: 'Não foi possivél obter o cardapio. Tente mais tarde.'
              }).present();
          });
    }

      submit(cardapio){
        console.log(cardapio.nome);
        this.navCtrl.push(FazerpedidoPage, {cardapioSelecionado: cardapio});

      }
      
  }