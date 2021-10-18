import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-pent',
  templateUrl: './modal-pent.component.html',
  styleUrls: ['./modal-pent.component.scss'],
})
export class ModalPentComponent implements OnInit {
  token: string;
  dadosUsuario = {
    available_deliveries: [
      {
        id: '',
        product: '',
        pickup_place: '',
        delivery_place: '',
        receive_client: '',
      },
    ],
  };
  entregasDisponiveis = [
    {
      id: '',
      product: '',
      pickup_place: '',
      delivery_place: '',
      receive_client: '',
    },
  ];
  entrega = {
    id: '',
    product: '',
    pickup_place: '',
    delivery_place: '',
    receive_client: '',
  };

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private toastCtrl: ToastController
  ) {
    this.token = localStorage.getItem('token');
    this.dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'));
    this.entregasDisponiveis = this.dadosUsuario.available_deliveries;
    console.log(this.entregasDisponiveis);
  }

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  validaEntregas() {
    if (this.entregasDisponiveis[0]) {
      return true;
    } else {
      return false;
    }
  }

  atualizar(event: any) {
    console.log(event);
    this.apiService
      .DelivererDashboard(this.token)
      .then((res) => {
        console.log(res);
        localStorage.setItem('dadosUsuario', JSON.stringify(res));
        this.entregasDisponiveis = res['available_deliveries'];
      })
      .catch((erro) => {
        console.log(erro);
      });

    setTimeout(() => {
      this.toastMsg('Página atualizada com sucesso');
      event.target.complete();
    }, 2000);
  }

  async toastMsg(msg: string) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }

  aceitaEntrega(id) {
    console.log(id);
    id = id.toString();
    this.apiService
      .AceitaEntrega(id)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
