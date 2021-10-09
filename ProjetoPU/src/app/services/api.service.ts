import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api : string = "http://127.0.0.1:8000/api/";
  


  constructor(private http : HttpClient, private headers: HttpHeaders) { }

  

  RegistraCliente(dados){
    return this.http.post(`${this.api}register`, dados).toPromise();
  }

  RegistraEntregador(dados){
    return this.http.post(`${this.api}register-deliverer`, dados).toPromise();
  }

  LoginCliente(dados){
    return this.http.post(`${this.api}login-client`, dados).toPromise();
  }

  LoginEntregador(dados){
    return this.http.post(`${this.api}login-deliverer`, dados).toPromise();
  }

  RecuperacaoSenhaCliente(dados){
    return this.http.post(`${this.api}forget-client`, dados).toPromise();
  }

  RecuperacaoSenhaEntregador(dados){
    return this.http.post(`${this.api}forget-deliverer`, dados).toPromise();
  }

  ClientDashboard(){
    this.headers.append('Authorization','Bearer '+ localStorage.getItem('Bearer_token'));
    return this.http.get(`${this.api}client-dashboard`, {headers: this.headers}).toPromise();
  }

}
