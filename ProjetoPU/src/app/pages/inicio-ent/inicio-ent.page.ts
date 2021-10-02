import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-ent',
  templateUrl: './inicio-ent.page.html',
  styleUrls: ['./inicio-ent.page.scss'],
})
export class InicioEntPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  gotoPent(){
    this.navCtrl.navigateForward('main-entregador/tabs/pent');
  }

}
