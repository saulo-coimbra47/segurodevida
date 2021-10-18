import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertController, IonSlides, NavController, ToastController } from '@ionic/angular';
import { ValidaForm } from 'src/app/classes/valida-form';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
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
  confirmasenhaCadastro: string;
  senhaLogin: string;
  cidadeUF: string;
  cidade: string;
  UF: string;
  endereco: string;
  rua: string;
  numero: string;
  bairro: string;
  modelo: string;
  placa: string;
  cor: string;
  dadosUsuario: any = {};
  message: any;
  Dados: any = {};
  falhaLogin: boolean = false;
  msgLogin: string;
  msgCadastro: string;
  usuarioLogin: Usuario = { email: '', password: '' };

  constructor(private alertCtrl: AlertController,
    private navCtrl: NavController,
    private apiService: ApiService,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private form: ValidaForm) {

  }

  ngOnInit() { }


  segmentChanged(event: any) {
    if (event.detail.value === 'cadastro') {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
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
    let X = this.telefone.length;
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

  async validaCPF() {
    if (this.cpf) {
      let X = this.cpf.length;
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
    } else {
      const alert = await this.alertCtrl.create({
        header: 'CPF inválido',
        message: 'Informe um CPF válido para se cadastrar!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }


  }

  validaTelefone() {
    if (this.telefone) {
      let X = this.telefone.length;
      let char = this.telefone.charAt(X - 1);
      let caracteresPossiveis = "1 2 3 4 5 6 7 8 9 0 ( ) -";
      if (caracteresPossiveis.includes(char)) {
        return true;
      }
      else {
        this.telefone = this.telefone.substring(0, X - 1);
        X -= 1;
        return false;
      }
    } else {
      return false;
    }


  }

  validaSenha() {
    this.form.validaSenha(this.senhaCadastro, this.confirmasenhaCadastro);
  }

  validaTelefone2() {
    this.form.validaTelefone2(this.telefone);
  }

  async validaCidade() {
    if (this.cidadeUF) {
      if (this.cidadeUF.length < 6) {
        const alert = await this.alertCtrl.create({
          header: 'Cidada inválida',
          message: 'Informe o nome da cidade para continuar! ' + this.cidadeUF,
          buttons: ['OK']
        });
        alert.present();
        return false;
      } else if (!this.cidadeUF.includes("-")) {
        const alert = await this.alertCtrl.create({
          header: 'Cidade inválida',
          message: 'Preencha corretamente o campo de cidade! ' + this.cidadeUF,
          buttons: ['OK']
        });
        alert.present();
        return false;
      } else {
        let idx = this.cidadeUF.indexOf("-");
        let idxe = this.cidadeUF.length;
        let cidade = this.cidadeUF.substring(0, idx);
        let UF = this.cidadeUF.substring(idx + 1, idxe + 1);
        UF = UF.toUpperCase();
        cidade = cidade.charAt(0).toUpperCase() + cidade.slice(1);

        this.cidade = cidade,
          this.UF = UF

        return true;
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Cidade iválida',
        message: 'Informe o nome da cidade para continuar! ',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
  }


  async validaEndereco() {
    if (this.endereco) {
      let virgulas = this.endereco.split(',').length - 1;
      if (virgulas != 2) {
        const alert = await this.alertCtrl.create({
          header: 'Endereço inválido',
          message: "Preencha o campo de endereço corretamente para continuar!",
          buttons: ['OK']
        });
        alert.present();
        return false;
      } else {
        this.formataEndereco();
        return true;
      }

    } else {
      const alert = await this.alertCtrl.create({
        header: 'Endereço inválido',
        message: 'Informe o endereço corretamente para continuar! ',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
  }

  formataEndereco() {
    let idx = this.endereco.indexOf(',');
    let idx2 = this.endereco.lastIndexOf(',');
    let idxe = this.endereco.length;
    let rua = this.endereco.substring(0, idx);
    let numero = this.endereco.substring(idx + 1, idx2);
    let bairro = this.endereco.substring(idx2 + 1, idxe);
    rua = rua.toUpperCase();
    if (bairro.includes(" ")) {
      for (let i = 0; i <= bairro.length; i++) {
        if (bairro.charAt(i) == " ") {
          bairro = bairro.slice(1);
          bairro = bairro.toUpperCase();
        } else {
          break;
        }
      }
    }
    this.numero = numero
    this.rua = rua
    this.bairro = bairro

    return true;
  }
  formatoPlaca() {
    return this.form.formatoPlaca();
  }

  Registra() {
    this.form.validaEmailCadastro(this.emailCadastro);
    this.form.validaNome(this.nome);
    this.validaCPF();
    this.validaTelefone2();
    this.validaSenha();
    this.validaCidade();
    this.validaEndereco();
    if (this.entregador) {
      this.form.validaPlaca(this.placa);
      this.form.validaCor(this.cor)
      this.form.validaModelo(this.modelo);

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
        street: this.rua,
        neighborhood: this.bairro,
        number: this.numero,
        city: this.cidade,
        state: this.UF
      }
      console.log(this.Dados);
      this.apiService.RegistraEntregador(this.Dados).then((result) => {
        console.log(result);
        this.form.CadastroRealizado();
      }).catch((erro) => {
        console.log(erro['error']);
        let msg1: string = erro['error'].errors['cpf'];
        let msg2: string = erro['error'].errors['email'];
        let msg3: string = erro['error'].errors['plaque'];
        console.log("msg1: " + msg1);
        console.log("msg2: " + msg2);
        console.log("msg3: " + msg3);
        if (msg1) {
          if (msg1 == 'Campo cpf é obrigatório.') {

          }
          else {
            this.msgCadastro = 'CPF inválido';
            this.toastMsg(this.msgCadastro);
          }

        } else if (msg2) {
          this.msgCadastro = "O e-mail inserido já está em uso.";
          this.toastMsg(this.msgCadastro);
        }
        if (msg3) {
          this.formatoPlaca();
        } else {
          this.toastMsg('O e-mail inserido já está em uso.')
        }
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
        street: this.rua,
        neighborhood: this.bairro,
        number: this.numero,
        city: this.cidade,
        state: this.UF
      }
      console.log(this.Dados);
      this.apiService.RegistraCliente(this.Dados).then((result) => {
        console.log(result);
        this.msgCadastro = "Cadastro Realizado!";
        this.form.CadastroRealizado();
      }).catch((erro) => {
        console.log(erro['error']);
        let msg1: string = erro['error'].errors['cpf'];
        let msg2: string = erro['error'].errors['email'];
        console.log("msg1: " + msg1);
        console.log("msg2: " + msg2);
        if (msg1) {
          if (msg1 == "Campo cpf é obrigatório.") {

          }
          else {
            this.msgCadastro = 'CPF Inválido';
            this.toastMsg(this.msgCadastro);
          }

        } else if (msg2) {
          this.msgCadastro = "O e-mail inserido já está em uso.";
          this.toastMsg(this.msgCadastro);
        }

      });
    }

  }

  Login() {
    this.Dados = {
      email: this.emailLogin,
      password: this.senhaLogin
    }
    if (this.entregador_login) {
      this.apiService.LoginEntregador(this.Dados).then((result) => {
        let token: string = result['Bearer_token'];
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', 'entregador');
        this.authService.setAuth(true);
        this.apiService.DelivererDashboard(token).then((result) => {
          console.log(result);
          this.dadosUsuario = result;
          localStorage.setItem('dadosUsuario', JSON.stringify(this.dadosUsuario));
          this.gotoMainEntregador();
        }).catch((erro) => {
          console.log(erro);
        })

      }).catch((erro) => {
        console.log(erro['error']);
        this.msgLogin = erro['error'].message;
        this.toastMsg(this.msgLogin);
      })
    } else {

      this.apiService.LoginCliente(this.Dados).then((result) => {

        let token: string = result['Bearer_token'];
        localStorage.setItem('usuario', 'cliente');
        localStorage.setItem('token', token);
        this.authService.setAuth(true);
        this.apiService.ClientDashboard(token).then((result) => {
          localStorage.setItem('dadosUsuario', JSON.stringify(result));
          this.gotoMain();
        }).catch((erro) => {
          console.log(erro);
        });


      }).catch((erro) => {
        this.msgLogin = erro['error'].message;
        this.toastMsg(this.msgLogin);
        this.authService.setAuth(false);
      });
    }

  }


  gotoRecuperacao() {
    this.navCtrl.navigateForward('recuperecao');
  }

  gotoMain() {
    this.navCtrl.navigateRoot('main/tabs/inicial');
  }

  gotoMainEntregador() {
    this.navCtrl.navigateRoot('main-entregador/tabs/inicial');
  }



  async toastMsg(msg: string) {
    if (msg == "The given data was invalid.") {
      let toast = await this.toastCtrl.create({
        message: 'Os dados inforamdos são inválidos',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
    } else {
      let toast = await this.toastCtrl.create({
        message: msg,
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
    }
  }

}
