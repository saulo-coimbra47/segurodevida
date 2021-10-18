import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController, ToastController } from '@ionic/angular';
import { ModalEntregasComponent } from 'src/app/componentes/modal-entregas/modal-entregas.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-entregas-ent',
  templateUrl: './entregas-ent.page.html',
  styleUrls: ['./entregas-ent.page.scss'],
})
export class EntregasEntPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  token: string;
  dadosUsuario = {
    pending_deliveries: [
      {
        id: '',
        product: '',
        pickup_place: '',
        delivery_place: '',
        receive_client: '',
      },
    ],
    done_deliveries: [
      {
        id: '',
        product: '',
        pickup_place: '',
        delivery_place: '',
        receive_client: '',
      },
    ],
  };
  entregasPendentes = [
    {
      id: '',
      product: '',
      pickup_place: '',
      delivery_place: '',
      receive_client: '',
    },
  ];
  entregasConcluidas = [
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
    private apiService: ApiService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) {
    this.token = localStorage.getItem('token');
    this.dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'));
    this.entregasPendentes = this.dadosUsuario.pending_deliveries;
    this.entregasConcluidas = this.dadosUsuario.done_deliveries;
  }

  ngOnInit() {}

  segmentChanged(event: any) {
    if (event.detail.value === 'pendentes') {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

  atualizar(event: any) {
    console.log(event);
    this.apiService
      .DelivererDashboard(this.token)
      .then((res) => {
        console.log(res);
        localStorage.setItem('dadosUsuario', JSON.stringify(res));
        this.entregasPendentes = res['pending_deliveries'];
        this.entregasConcluidas = res['done_deliveries'];
      })
      .catch((erro) => {
        console.log(erro);
      });

    setTimeout(() => {
      this.toastMsg('Página atualizada com sucesso');
      event.target.complete();
    }, 2000);
  }

  validaEntregaPendente() {
    if (this.entregasPendentes[0]) {
      return true;
    } else {
      return false;
    }
  }

  validaEntregaConcluida() {
    if (this.entregasConcluidas[0]) {
      return true;
    } else {
      return false;
    }
  }

  async toastMsg(msg: string) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }

  async gotoInfo(entrega) {
    localStorage.setItem('entrega', JSON.stringify(entrega));
    let modal = await this.modalCtrl.create({
      component: ModalEntregasComponent,
    });

    return await modal.present();
  }
}
