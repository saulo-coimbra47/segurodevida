import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-cad',
  templateUrl: './modal-cad.component.html',
  styleUrls: ['./modal-cad.component.scss'],
})
export class ModalCadComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  dismiss() {

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
