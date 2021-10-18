import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }
  canLoad(): Promise<boolean> {
    return new Promise(resolve =>{
      let x = this.authService.getAuth();
      console.log(x);
      if(x == true){
        this.router.navigate(['main/tabs/inicial']);
        console.log(x);
        resolve(x ? true : false);
      } 
    })
  }
  
}
