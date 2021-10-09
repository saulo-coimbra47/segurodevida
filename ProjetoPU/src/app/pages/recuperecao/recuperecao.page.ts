import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-recuperecao',
  templateUrl: './recuperecao.page.html',
  styleUrls: ['./recuperecao.page.scss'],
})
export class RecuperecaoPage implements OnInit {

  entregador : boolean = false;
  email : string;
  Dados: any = {};
  constructor(private apiService: ApiService, private alertCtrl: AlertController, private navCtrl: NavController) { }

  ngOnInit() {
  }

  Recuperar (){
    console.log(this.email);
    this.Dados = {
      email: this.email
    }
    if(this.entregador){
      this.apiService.RecuperacaoSenhaEntregador(this.Dados).then((result) =>{
        console.log(result);
      }).catch((erro) =>{
        console.log(erro['message']);
      });
    }else{
      this.apiService.RecuperacaoSenhaCliente(this.Dados).then(async (result) =>{
        console.log(result);
        const alert = await this.alertCtrl.create({
          header: 'Sucesso',
          message: result['message'],
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.navigateRoot('/');
      }).catch((erro) =>{
        console.log(erro['message']);
      })
    }
  }

}
