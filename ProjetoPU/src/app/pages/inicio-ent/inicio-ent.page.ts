import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPentComponent } from 'src/app/componentes/modal-pent/modal-pent.component';

@Component({
  selector: 'app-inicio-ent',
  templateUrl: './inicio-ent.page.html',
  styleUrls: ['./inicio-ent.page.scss'],
})
export class InicioEntPage implements OnInit {

  dadosUsuario: any = {}
  usuario: string;
  token: string;

  constructor(private modalCtrl: ModalController) {
    this.dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'));
    this.usuario = localStorage.getItem('usuario');
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
  }

  async gotoPent() {
    let modal = await this.modalCtrl.create({
      component: ModalPentComponent
    });

    return await modal.present();
  }

}
