import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  dadosUsuario: any = {}
  Bearer_token: any = {}

  constructor(private navCtrl: NavController, private apiService: ApiService) {
   
  }

  ngOnInit() { }

  modelEditSenha() {

  }

  modelEditEndereco() {

  }

  logout() {
    localStorage.removeItem('dadosUsuario');
    this.navCtrl.navigateRoot('/');

  }

  // teste(){
  //   this.apiService.ClientDashboard(this.dadosUsuario.token).then((result) =>{
  //     console.log(result);
  //   }).catch((erro) =>{
  //     console.log(erro);
  //   })

  // }


       
};




