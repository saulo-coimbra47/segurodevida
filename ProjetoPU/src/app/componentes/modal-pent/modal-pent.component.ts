import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-pent',
  templateUrl: './modal-pent.component.html',
  styleUrls: ['./modal-pent.component.scss'],
})
export class ModalPentComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  dismiss() {

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
