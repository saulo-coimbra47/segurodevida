import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ValidaForm } from 'src/app/classes/valida-form';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-cad',
  templateUrl: './modal-cad.component.html',
  styleUrls: ['./modal-cad.component.scss'],
})
export class ModalCadComponent implements OnInit {

  conteudo: string;
  nomeRecebedor: string;
  enderecoRetirada: string;
  cidadeUFRetirada: string;
  enderecoEntrega: string;
  cidadeUFEntrega: string;
  dadosUsuario: any = {};
  token: string;


  constructor(private modalCtrl: ModalController, private apiService: ApiService, private toastCtrl: ToastController, private formCtrl: ValidaForm) {
    this.dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'));
    this.token = localStorage.getItem('token');
  }

  ngOnInit() { }

  dismiss() {

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  Registra() {
    this.formCtrl.validaProduto(this.conteudo);
    this.formCtrl.validaRecebedor(this.nomeRecebedor);
    this.formCtrl.validaEndereco(this.enderecoEntrega);
    this.formCtrl.validaEndereco(this.enderecoRetirada);
    this.formCtrl.validaCidade(this.cidadeUFRetirada);
    this.formCtrl.validaCidade(this.cidadeUFEntrega);
    let id = this.dadosUsuario.user.id;
    let dados = {
      product: this.conteudo,
      delivery_place: this.enderecoEntrega + '. ' + this.cidadeUFEntrega,
      pickup_place: this.enderecoRetirada + '. ' + this.cidadeUFRetirada,
      receive_client: this.nomeRecebedor,
      user_id: id
    }

    let token = localStorage.getItem('token');

    this.apiService.RegistraEntrega(dados, token).then(() => {
      this.apiService.ClientDashboard(token).then((res) => {
        localStorage.setItem('dadosUsuario', JSON.stringify(res));
        this.formCtrl.CadastroRealizado();
      }).catch((erro) => {
        console.log(erro);
      })

    }).catch((erro) => {
      console.log(erro);
      let msg = erro.errors;
      this.toastMsg(msg);
    });

  }

  async toastMsg(msg: string) {
    if (msg == "The given data was invalid.") {
      let toast = await this.toastCtrl.create({
        message: 'Os dados inforamdos são inválidos',
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


}
