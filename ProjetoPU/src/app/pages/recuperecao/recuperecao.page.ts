import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-recuperecao',
  templateUrl: './recuperecao.page.html',
  styleUrls: ['./recuperecao.page.scss'],
})
export class RecuperecaoPage implements OnInit {

  entregador: boolean = false;
  email: string;
  Dados: any = {};
  carregamento: any;

  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async Recuperar() {

    await this.Carregamento();

    this.Dados = {
      email: this.email
    }
    if (this.entregador) {
      this.apiService.RecuperacaoSenhaEntregador(this.Dados).then((result) => {
        this.carregamento.dismiss();
        this.sucessoRec(result['message']);
      }).catch((erro) => {
        this.carregamento.dismiss();
        this.toastMsg(erro['error'].message);
      });
    } else {
      this.apiService.RecuperacaoSenhaCliente(this.Dados).then(async (result) => {
        this.carregamento.dismiss();
        this.sucessoRec(result['message']);
      }).catch((erro) => {
        this.carregamento.dismiss();
        this.toastMsg(erro['error'].message);
      })
    }


  }

  async Carregamento() {
    this.carregamento = await this.loadingCtrl.create({
      message: 'Por favor, aguarde...'
    });
    return this.carregamento.present();

  }

  async toastMsg(msg: string) {
    if (msg == "The given data was invalid.") {
      let toast = await this.toastCtrl.create({
        message: 'O e-mail inforamdo é inválido',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
    } else {
      let toast = await this.toastCtrl.create({
        message: msg,
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
    }
  }

  async sucessoRec(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Sucesso',
      message: msg,
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.navigateRoot('/');
  }


}
