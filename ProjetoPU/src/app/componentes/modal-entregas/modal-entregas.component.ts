import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-entregas',
  templateUrl: './modal-entregas.component.html',
  styleUrls: ['./modal-entregas.component.scss'],
})
export class ModalEntregasComponent implements OnInit {
  entrega = {id: '', product: '', pickup_place: '', delivery_place: '', receive_client: ''};

  constructor(private modalCtrl: ModalController) { 
    this.entrega = JSON.parse(localStorage.getItem('entrega'));
  }

  ngOnInit() {}

  dismiss() {

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
