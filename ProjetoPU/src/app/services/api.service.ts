import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api : string = "http://127.0.0.1:8000/api/";

  constructor(private http : HttpClient) { }

  RegistraCliente(dados){
    return this.http.post(`${this.api}register`, dados);
  }

  RegistraEntregador(dados){
    return this.http.post(`${this.api}register-deliverer`, dados);
  }

  LoginCliente(dados){
    return this.http.post(`${this.api}login-client`, dados);
  }

  LoginEntregador(dados){
    return this.http.post(`${this.api}login-deliverer`, dados);
  }

  RecuperacaoSenhaCliente(dados){
    return this.http.post(`${this.api}forget-client`, dados);
  }

  RecuperacaoSenhaEntregador(dados){
    return this.http.post(`${this.api}forget-deliverer`, dados);
  }

}
