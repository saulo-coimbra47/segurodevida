import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.page.html',
  styleUrls: ['./inicial.page.scss'],
})
export class InicialPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  gotoCad() {
    this.navCtrl.navigateForward('main/tabs/cad');
  }

}
