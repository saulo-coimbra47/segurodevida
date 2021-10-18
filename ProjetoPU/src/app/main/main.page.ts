import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
 

  constructor(private navCtrl: NavController) { 
    
  }

  ngOnInit() {
  }

  gotoInicio(){
    this.navCtrl.navigateRoot('tabs/inicial');
  }
}
