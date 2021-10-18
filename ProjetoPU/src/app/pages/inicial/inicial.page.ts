import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCadComponent } from 'src/app/componentes/modal-cad/modal-cad.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.page.html',
  styleUrls: ['./inicial.page.scss'],
})
export class InicialPage implements OnInit {
  
  dadosUsuario: any = {}
  usuario: string;
  token: string;

  constructor(private modalCtrl: ModalController, private apiService: ApiService) {
    this.dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'));
    this.usuario = localStorage.getItem('usuario');
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    
  }

  async gotoCad() {
    let modal = await this.modalCtrl.create({
      component: ModalCadComponent
    });

    return await modal.present();
  }

}
