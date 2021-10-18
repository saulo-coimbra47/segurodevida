import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private navCtrl: NavController) { }
  canLoad(): Promise<boolean> {
    return new Promise(resolve =>{
      let x = this.authService.getAuth(); 
      console.log(x);
      if(!x){
        this.navCtrl.navigateRoot('/');
        console.log(x);
        resolve(x ? true : false);
      }
    })
  }
  
}
