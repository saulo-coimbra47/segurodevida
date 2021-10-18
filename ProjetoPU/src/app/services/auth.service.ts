import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private status: boolean;

  constructor() { }

  setAuth(status: boolean) {
    this.status = status;
  }

  getAuth() {
    if (this.status) {
      let test = localStorage.getItem('token');
      console.log(test);
      return true;
    } else {
      console.log(status);
      return false;
    }
  }
}