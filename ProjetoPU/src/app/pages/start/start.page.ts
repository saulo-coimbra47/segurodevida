import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  entregador: boolean = false;
  entregador_login: boolean = false;
  cpf: string;
  telefone: string;
  nome: string;
  emailCadastro: string;
  emailLogin: string;
  senhaCadastro: string;
  senhaLogin: string;
  cidadeUF: string;
  endereco: string;
  modelo: string;
  placa: string;
  cor: string;
  mensagem: any = "A";
  Dados: any = {};


  constructor(private navCtrl: NavController, private apiService: ApiService) { }

  ngOnInit() { }


  Registra() {
    
    if (this.entregador) {
      this.Dados = {
        cpf: this.cpf,
        name: this.nome,
        email: this.emailCadastro,
        image: '1',
        cnh_image: '2',
        phone: this.telefone,
        password: this.senhaCadastro,
        password_confirmation: this.senhaCadastro,
        plaque: this.placa,
        color: this.cor,
        model: this.modelo,
        document: '3',
        street: 'Rua',
        neighborhood: 'Bairro',
        number: '1',
        city: 'cidade',
        state: 'estado'
      }
      this.apiService.RegistraEntregador(this.Dados).subscribe(data => {
        /*this.mensagem = data;
        if(this.mensagem === true){
          return this.mensagem.message;
        }
        else{
          return this.mensagem.errors;
        }*/

      });
    } else {
      this.Dados = {
        cpf: this.cpf,
        name: this.nome,
        email: this.emailCadastro,
        image: '1',
        phone: this.telefone,
        password: this.senhaCadastro,
        password_confirmation: this.senhaCadastro,
        street: 'Rua',
        neighborhood: 'Bairro',
        number: '1',
        city: 'cidade',
        state: 'estado'
      }
      this.apiService.RegistraCliente(this.Dados).subscribe(data => {
        console.log(data);
      });
    }

  }

  Login(){
    this.Dados = {
      email: this.emailLogin,
      password: this.senhaLogin
    }
    if(this.entregador_login){
      this.apiService.LoginEntregador(this.Dados).subscribe(data => {
        console.log(data);
      });
    }else{
      this.apiService.LoginCliente(this.Dados).subscribe(data => {
        console.log(data);
        this.gotoMain();
      });
    }
    
  }


  segmentChanged(event: any) {
    if (event.detail.value === "cadastro") {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }


  }

  gotoRecuperacao() {
    this.navCtrl.navigateForward('recuperecao');
  }

  gotoMain(){
    this.navCtrl.navigateForward('main');
  }

  MaskCPF() {
    var X = this.cpf.length;
    switch (X) {
      case 3:
        this.cpf = this.cpf + ".";
        break;
      case 7:
        this.cpf = this.cpf + ".";
        break;
      case 11:
        this.cpf = this.cpf + "-";
        break;
      default:
        return;
        break;
    }

  }

  MaskTel() {
    var X = this.telefone.length;
    switch (X) {
      case 1:
        var num = this.telefone.charAt(0);
        this.telefone = this.telefone.substring(0, X - 1);
        X -= 1;
        this.telefone = "(" + num;
        break;
      case 3:
        this.telefone = this.telefone + ") ";
        break;
      case 10:
        this.telefone = this.telefone + "-";
        break;
      default:
        return;
        break;
    }
  }

  validaCPF() {
    var X = this.cpf.length;
    var char = this.cpf.charAt(X - 1);
    var caracteresPossiveis = "1 2 3 4 5 6 7 8 9 0 . -";
    if (caracteresPossiveis.includes(char)) {
      return true;
    }
    else {
      this.cpf = this.cpf.substring(0, X - 1);
      X -= 1;
      return false;
    }

  }

  validaTelefone() {
    var X = this.telefone.length;
    var char = this.telefone.charAt(X - 1);
    var caracteresPossiveis = "1 2 3 4 5 6 7 8 9 0 ( ) -";
    if (caracteresPossiveis.includes(char)) {
      return true;
    }
    else {
      this.telefone = this.telefone.substring(0, X - 1);
      X -= 1;
      return false;
    }

  }


}
