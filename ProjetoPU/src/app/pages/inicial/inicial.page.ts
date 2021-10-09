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
  
  Bearer_token: any = {}

  constructor(private modalCtrl: ModalController, private apiService: ApiService) { 
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
