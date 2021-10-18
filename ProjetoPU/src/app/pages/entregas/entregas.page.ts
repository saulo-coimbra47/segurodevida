import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController, ToastController } from '@ionic/angular';
import { ModalEntregasComponent } from 'src/app/componentes/modal-entregas/modal-entregas.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.page.html',
  styleUrls: ['./entregas.page.scss'],
})
export class EntregasPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  usuario: string;
  token: string;
  dadosUsuario = {
    open_deliveries: [
      {
        id: '',
        product: '',
        pickup_place: '',
        delivery_place: '',
        receive_client: '',
      },
    ],
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
    user: {},
  };
  entregasAbertas = [
    {
      id: '',
      product: '',
      pickup_place: '',
      delivery_place: '',
      receive_client: '',
    },
  ];
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
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'));
    this.entregasAbertas = this.dadosUsuario.open_deliveries;
    this.entregasPendentes = this.dadosUsuario.pending_deliveries;
    this.entregasConcluidas = this.dadosUsuario.done_deliveries;
    this.usuario = localStorage.getItem('usuario');
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {}

  segmentChanged(event: any) {
    if (event.detail.value === 'pendentes') {
      this.slides.slideTo(1);
    } else if (event.detail.value === 'confirmadas') {
      this.slides.slideTo(2);
    } else {
      this.slides.slideTo(0);
    }
  }

  atualizar(event: any) {
    console.log(event);
    this.apiService
      .ClientDashboard(this.token)
      .then((res) => {
        console.log(res);
        localStorage.setItem('dadosUsuario', JSON.stringify(res));
        this.entregasAbertas = res['open_deliveries'];
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

  async gotoInfo(entrega) {
    localStorage.setItem('entrega', JSON.stringify(entrega));
    let modal = await this.modalCtrl.create({
      component: ModalEntregasComponent,
    });

    return await modal.present();
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
}
