import { Component, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';

import { AlertController, IonSlides, NavController, ToastController } from '@ionic/angular';
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
  falhaCadastro: boolean = false;
  msgCadastro: string;
  slidevalue: string = 'cadastro';
  Bearer: { };


  constructor(private alertCtrl: AlertController, private navCtrl: NavController, private apiService: ApiService, private toastCtrl: ToastController) { }

  ngOnInit() { }


  Registra() {
    this.validaEmailCadastro();
    this.validaNome();
    this.validaCPF();
    this.validaTelefone2();
    this.validaSenha();
    this.validaCidade();
    this.validaEndereco();
    if (this.entregador) {

      this.validaPlaca();
      this.validaCor();
      this.validaModelo();



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
      this.apiService.RegistraEntregador(this.Dados).then((result) => {
        console.log(result);
        this.CadastroRealizado();
      }).catch((erro) => {
        console.log(erro['error']);
        let msg1: string = erro['error'].errors['cpf'];
        let msg2: string = erro['error'].errors['email'];
        let msg3: string = erro['error'].errors['plaque'];
        console.log("msg1: " + msg1);
        console.log("msg2: " + msg2);
        console.log("msg3: " + msg3);
        if (msg1) {
          if (msg1 == "The cpf field is required.") {
            this.falhaCadastro = false;
          }
          else {
            this.msgCadastro = erro['error'].errors['cpf'];
            this.toastMsg(this.msgCadastro);
          }

        } else if (msg2) {
          this.msgCadastro = "O e-mail inserido já está em uso.";
          this.toastMsg(this.msgCadastro);
        }
        if (msg3) {
          this.formatoPlaca();
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
      this.apiService.RegistraCliente(this.Dados).then((result) => {
        console.log(result);
        this.msgCadastro = "Cadastro Realizado!";
        this.CadastroRealizado();
      }).catch((erro) => {
        console.log(erro['error']);
        let msg1: string = erro['error'].errors['cpf'];
        let msg2: string = erro['error'].errors['email'];
        console.log("msg1: " + msg1);
        console.log("msg2: " + msg2);
        if (msg1) {
          if (msg1 == "The cpf field is required.") {
            this.falhaCadastro = false;
          }
          else {
            this.msgCadastro = erro['error'].errors['cpf'];
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

        this.apiService.DelivererDashboard(result['Bearer_token']).then((result) =>{
          console.log(result);
        }).catch((erro) =>{
          console.log(erro);
        })

        // this.gotoMainEntregador();
      }).catch((erro) => {
        console.log(erro['error']);
        this.msgLogin = erro['error'].message;
        this.toastMsg(this.msgLogin);
      })
    } else {
      this.apiService.LoginCliente(this.Dados).then((result) => {
        
        console.log(result['Bearer_token']);
          
          this.apiService.ClientDashboard(result['Bearer_token']).then((result) =>{
            console.log(result);
          }).catch((erro) =>{
            console.log(erro);
          })

          // console.log(result);

          
        
      }).catch((erro) => {
        console.log(erro['error']);
        this.msgLogin = erro['error'].message;
        this.toastMsg(this.msgLogin);
      });
    }

  }


  segmentChanged(event: any) {
    if (event.detail.value === this.slidevalue) {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
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

  async validaTelefone2() {
    if (this.telefone) {
      if (this.telefone.length < 15) {
        const alert = await this.alertCtrl.create({
          header: 'Telefone inválido',
          message: 'Preencha corretamente o campo de telefone!',
          buttons: ['OK']
        });
        alert.present();
      } else {
        return true;
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Telefone inválido',
        message: 'Preencha corretamente o campo de telefone!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }

  }

  async validaSenha() {
    if (this.senhaCadastro && this.confirmasenhaCadastro) {
      if (this.senhaCadastro !== this.confirmasenhaCadastro) {
        const alert = await this.alertCtrl.create({
          header: 'Senhas diferentes',
          message: 'As senhas inforamadas são diferentes!',
          buttons: ['OK']
        });
        alert.present();
        return false;
      } else if (this.senhaCadastro.length < 8) {
        const alert = await this.alertCtrl.create({
          header: 'Senha curta',
          message: 'A senha deve possuir no mínimo 8 carácteres!',
          buttons: ['OK']
        });
        alert.present();
        return false;
      } else {
        return true;
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Senha inválida',
        message: 'Preencha os campos de senha para continuar!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
  }

  async validaEmailCadastro() {
    if (this.emailCadastro) {
      return true;
    } else {
      const alert = await this.alertCtrl.create({
        header: 'E-mail inválido',
        message: 'Informe um e-mail para continuar!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
  }

  async validaNome() {
    if (this.nome) {
      if (this.nome.length < 8) {
        const alert = await this.alertCtrl.create({
          header: 'Nome Curto',
          message: 'Informe seu nome e sobrenome para continuar!',
          buttons: ['OK']
        });
        alert.present();
        return false;
      } else if (!this.nome.includes(" ")) {
        const alert = await this.alertCtrl.create({
          header: 'Nome Curto',
          message: 'Informe seu nome e sobrenome para continuar!',
          buttons: ['OK']
        });
        alert.present();
        return false;
      } else {
        return true;
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Nome iválido',
        message: 'Informe seu nome e sobrenome para continuar!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
  }

  async validaCidade() {
    if (this.cidadeUF) {
      if (this.cidadeUF.length < 6) {
        const alert = await this.alertCtrl.create({
          header: 'Cidada inválida',
          message: 'Informe o nome da sua cidade para continuar! ' + this.cidadeUF,
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
        this.cidade = this.cidadeUF.substring(0, idx);
        this.UF = this.cidadeUF.substring(idx + 1, idxe + 1);
        this.UF = this.UF.toUpperCase();
        this.cidade = this.cidade.charAt(0).toUpperCase() + this.cidade.slice(1);
        return true;
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Cidade iválida',
        message: 'Informe o nome da sua cidade para continuar! ',
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
        message: 'Informe o seu endereço corretamente para continuar! ',
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
    this.rua = this.endereco.substring(0, idx);
    this.numero = this.endereco.substring(idx + 1, idx2);
    this.bairro = this.endereco.substring(idx2 + 1, idxe);
    this.rua = this.rua.charAt(0).toUpperCase() + this.rua.slice(1);
    if (this.bairro.includes(" ")) {
      for (let i = 0; i <= this.bairro.length; i++) {
        if (this.bairro.charAt(i) == " ") {
          this.bairro = this.bairro.slice(1);
          this.bairro = this.bairro.charAt(0).toUpperCase() + this.bairro.slice(1);
        } else {
          return;
        }
      }
    }
  }

  async validaPlaca() {
    if (this.placa) {
      this.placa = this.placa.toUpperCase();
      if (this.placa.length < 7) {
        const alert = await this.alertCtrl.create({
          header: 'Formato de placa inválido',
          message: 'Preencha o campo da placa corretamente!',
          buttons: ['OK']
        });
        alert.present();
        return false;
      } else {
        return true;
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Formato de placa inválido',
        message: 'O campo de placa não possui um formato válido!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
  }
  async formatoPlaca() {
    const alert = await this.alertCtrl.create({
      header: 'Formato de placa inválido',
      message: 'O campo de placa não possui um formato válido!',
      buttons: ['OK']
    });
    alert.present();
    return false;
  }

  async validaCor() {

    if (this.cor) {
      if (this.cor.length < 3) {
        const alert = await this.alertCtrl.create({
          header: 'Cor inválida',
          message: 'Preencha o campo de cor do veículo corretamente!',
          buttons: ['OK']
        });
        alert.present();
        return false;
      } else {
        return true;
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Cor inválida',
        message: 'Preencha o campo de cor do veículo corretamente!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }


  }

  async validaModelo() {

    if (this.modelo) {
      if (this.modelo.length < 3) {
        const alert = await this.alertCtrl.create({
          header: 'Modelo inválido',
          message: 'Preencha o campo de modelo do veículo corretamente!',
          buttons: ['OK']
        });
        alert.present();
        return false;
      } else {
        return true;
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Modelo inválido',
        message: 'Preencha o campo de modelo do veículo corretamente!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }


  }

  async CadastroRealizado() {
    const alert = await this.alertCtrl.create({
      header: 'Cadastro Realizado',
      message: 'O seu cadastro foi realizado com sucesso!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            window.location.reload();
          }
        }
      ]
    });
    alert.present();
    return true;

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
