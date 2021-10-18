import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  dadosUsuario: any = {};
  usuario: string;
  token: string;

  constructor(
    private navCtrl: NavController,
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'));
    this.usuario = localStorage.getItem('usuario');
    this.token = localStorage.getItem('token');
    console.log(this.dadosUsuario);
  }

  ngOnInit() {}

  async alertEditSenha() {
    const alert = await this.alertCtrl.create({
      header: 'Alterar senha',
      inputs: [
        {
          name: 'senha',
          type: 'password',
          placeholder: 'Informe a sua senha',
        },
        {
          name: 'confirmaSenha',
          type: 'password',
          placeholder: 'Confirme a sua senha',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          handler: (form) => {
            let password = form.senha;
            if (password.length > 7) {
              if (form.senha == form.confirmaSenha) {
                let data = {
                  password: form.senha,
                };
                if (this.usuario == 'cliente') {
                  this.apiService
                    .EditClient(data)
                    .then(() => {
                      this.toastMsg('Senha alterada!', 'success');
                    })
                    .catch((e) => {
                      console.log(e);
                      this.toastMsg('Ocorreu um erro!', 'danger');
                    });
                }
              } else {
                this.toastMsg('Senhas diferentes!', 'danger');
              }
            } else {
              this.toastMsg('Senha curta!', 'danger');
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async alertEditEndereco() {
    const alert = await this.alertCtrl.create({
      header: 'Alterar endereço.',
      inputs: [
        {
          name: 'rua',
          type: 'text',
          placeholder: 'Rua',
        },
        {
          name: 'numero',
          type: 'number',
          placeholder: 'Número',
        },
        {
          name: 'bairro',
          type: 'text',
          placeholder: 'Bairro',
        },
        {
          name: 'cidade',
          type: 'text',
          placeholder: 'Cidade',
        },
        {
          name: 'UF',
          type: 'text',
          placeholder: 'UF',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          handler: (form) => {
            let street = form.rua;
            street = street.toUpperCase();
            let number = form.numero;
            let neighborhood = form.bairro;
            neighborhood = neighborhood.toUpperCase();
            let city = form.cidade;
            city = city.toUpperCase();
            let state = form.UF;
            state = state.toUpperCase();
            // if (street) {
            //   let data = {
            //     street: street,
            //   };
            //   if (this.usuario == 'cliente') {
            //     this.apiService
            //       .EditClient(data)
            //       .then(() => {
            //         this.toastMsg('Endereço alterado!', 'success');
            //         this.atualizar();
            //       })
            //       .catch((e) => {
            //         console.log(e);
            //         this.toastMsg('Ocorreu um erro!', 'danger');
            //       });
            //   } else {
            //     this.apiService
            //       .EditDeliverer(data)
            //       .then(() => {
            //         this.toastMsg('Endereço alterado!', 'success');
            //       })
            //       .catch((e) => {
            //         console.log(e);
            //         this.toastMsg('Ocorreu um erro!', 'danger');
            //       });
            //   }
            // } else if (number) {
            //   let data = {
            //     number: number,
            //   };
            //   if (this.usuario == 'cliente') {
            //     this.apiService
            //       .EditClient(data)
            //       .then(() => {
            //         this.toastMsg('Endereço alterado!', 'success');
            //       })
            //       .catch((e) => {
            //         console.log(e);
            //         this.toastMsg('Ocorreu um erro!', 'danger');
            //       });
            //   } else {
            //     this.apiService
            //       .EditDeliverer(data)
            //       .then(() => {
            //         this.toastMsg('Endereço alterado!', 'success');
            //       })
            //       .catch((e) => {
            //         console.log(e);
            //         this.toastMsg('Ocorreu um erro!', 'danger');
            //       });
            //   }
            //   this.atualizar();
            // } else if (neighborhood) {
            //   let data = {
            //     neighborhood: neighborhood,
            //   };
            //   if (this.usuario == 'cliente') {
            //     this.apiService
            //       .EditClient(data)
            //       .then(() => {
            //         this.toastMsg('Endereço alterado!', 'success');
            //       })
            //       .catch((e) => {
            //         console.log(e);
            //         this.toastMsg('Ocorreu um erro!', 'danger');
            //       });
            //   } else {
            //     this.apiService
            //       .EditDeliverer(data)
            //       .then(() => {
            //         this.toastMsg('Endereço alterado!', 'success');
            //       })
            //       .catch((e) => {
            //         console.log(e);
            //         this.toastMsg('Ocorreu um erro!', 'danger');
            //       });
            //   }
            //   this.atualizar();
            // } else if (city) {
            //   let data = {
            //     city: city,
            //   };
            //   if (this.usuario == 'cliente') {
            //     this.apiService
            //       .EditClient(data)
            //       .then(() => {
            //         this.toastMsg('Endereço alterado!', 'success');
            //       })
            //       .catch((e) => {
            //         console.log(e);
            //         this.toastMsg('Ocorreu um erro!', 'danger');
            //       });
            //   } else {
            //     this.apiService
            //       .EditDeliverer(data)
            //       .then(() => {
            //         this.toastMsg('Endereço alterado!', 'success');
            //       })
            //       .catch((e) => {
            //         console.log(e);
            //         this.toastMsg('Ocorreu um erro!', 'danger');
            //       });
            //   }
            //   this.atualizar();
            // } else if (state) {
            //   let data = {
            //     state: state,
            //   };
            //   if (this.usuario == 'cliente') {
            //     this.apiService
            //       .EditClient(data)
            //       .then(() => {
            //         this.toastMsg('Endereço alterado!', 'success');
            //       })
            //       .catch((e) => {
            //         console.log(e);
            //         this.toastMsg('Ocorreu um erro!', 'danger');
            //       });
            //   } else {
            //     this.apiService
            //       .EditDeliverer(data)
            //       .then(() => {
            //         this.toastMsg('Endereço alterado!', 'success');
            //       })
            //       .catch((e) => {
            //         console.log(e);
            //         this.toastMsg('Ocorreu um erro!', 'danger');
            //       });
            //   }
            //   this.atualizar();
            // } else {
            //   this.toastMsg(
            //     'Informe pelo menos 1 campo para alterar',
            //     'danger'
            //   );
            // }
            if (!street || !number || !neighborhood || !city || !state) {
              this.toastMsg('Preencha os campos corretamente', 'danger');
            } else {
              let data = {
                street: street,
                number: number,
                neighborhood: neighborhood,
                city: city,
                state: state,
              };
              if (this.usuario == 'cliente') {
                this.apiService
                  .EditClient(data)
                  .then(() => {
                    this.toastMsg('Endereço alterado!', 'success');
                    this.atualizar();
                  })
                  .catch((e) => {
                    console.log(e);
                    this.toastMsg('Ocorreu um erro!', 'danger');
                  });
              } else {
                this.apiService
                  .EditDeliverer(data)
                  .then(() => {
                    this.toastMsg('Endereço alterado!', 'success');
                    this.atualizar();
                  })
                  .catch((e) => {
                    console.log(e);
                    this.toastMsg('Ocorreu um erro!', 'danger');
                  });
              }
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async alertEditFone() {
    const alert = await this.alertCtrl.create({
      header: 'Alterar telefone',
      inputs: [
        {
          name: 'DDD',
          type: 'number',
          attributes: {
            maxLength: 2,
          },
          placeholder: 'Informe o DDD',
        },
        {
          name: 'fone',
          type: 'number',
          attributes: {
            maxlength: 9,
          },
          placeholder: 'Informe o telefone',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          handler: (form) => {
            let tel = form.fone;
            let ddd = form.DDD;
            if (!tel || !ddd) {
              this.toastMsg('Preencha os campos corretamente!', 'danger');
            } else if (tel.length < 9) {
              this.toastMsg('Informe um telefone válido!', 'danger');
            } else if (ddd.length != 2) {
              this.toastMsg('Informe um DDD válido!', 'danger');
            } else {
              let t1 = tel.substring(0, 5);
              let t2 = tel.substring(5, 9);
              let phone = '(' + ddd + ') ' + t1 + '-' + t2;
              let data = {
                phone: phone,
              };
              if (this.usuario == 'cliente') {
                this.apiService
                  .EditClient(data)
                  .then(() => {
                    this.toastMsg('Telefone alterado!', 'success');
                    this.atualizar();
                  })
                  .catch((e) => {
                    console.log(e);
                    this.toastMsg('Ocorreu um erro!', 'danger');
                  });
              } else {
                this.apiService
                  .EditDeliverer(data)
                  .then(() => {
                    this.toastMsg('Telefone alterado!', 'success');
                    this.atualizar();
                  })
                  .catch((e) => {
                    console.log(e);
                    this.toastMsg('Ocorreu um erro!', 'danger');
                  });
              }
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async alertEditVeiculo() {
    const alert = await this.alertCtrl.create({
      header: 'Alterar senha',
      inputs: [
        {
          name: 'modelo',
          type: 'text',
          placeholder: 'Marca-Modelo',
        },
        {
          name: 'cor',
          type: 'text',
          placeholder: 'Cor',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          handler: (form) => {
            let model = form.modelo;
            let color = form.cor;
            model = model.toUpperCase();
            color = color.toUpperCase();
            if (!model || !color) {
              this.toastMsg('Preencha os campos corretamente', 'danger');
            } else if (!model.includes('-')) {
              this.toastMsg('Informe a marca e o modelo do veículo', 'danger');
            } else if (model.length < 8) {
              this.toastMsg('Informe a marca e o modelo do veículo', 'danger');
            } else if (color.length < 4) {
              this.toastMsg('Informe a cor do veículo', 'danger');
            } else {
              let data = {
                model: model,
                color: color,
              };
              this.apiService
                .EditDeliverer(data)
                .then(() => {
                  this.toastMsg('Veículo alterado!', 'success');
                  this.atualizar();
                })
                .catch((e) => {
                  this.toastMsg('Ocorreu um erro!', 'danger');
                });
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async alertEditPlaca() {
    const alert = await this.alertCtrl.create({
      header: 'Alterar senha',
      inputs: [
        {
          name: 'placa',
          type: 'text',
          placeholder: 'Informe a placa do veiculo',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          handler: (form) => {
            let plaque = form.placa;
            plaque = plaque.toUpperCase();
            if (!plaque || plaque.legnth < 7 || plaque.length > 8) {
              this.toastMsg('Preencha o campo corretamente', 'danger');
            } else if (plaque.includes('-') && plaque.legnth == 7) {
              this.toastMsg('Placa informada inválida', 'danger');
            } else if (plaque.length == 8 && !plaque.includes('-')) {
              this.toastMsg('Placa informada inválida', 'danger');
            } else {
              let data = {
                plaque: plaque,
              };
              this.apiService
                .EditDeliverer(data)
                .then(() => {
                  this.toastMsg('Placa alterada!', 'success');
                  this.atualizar();
                })
                .catch((e) => {
                  this.toastMsg('Placa inválida!', 'danger');
                  console.log(e);
                });
            }
          },
        },
      ],
    });
    await alert.present();
  }

  logout() {
    // let id : string = JSON.stringify(this.dadosUsuario.user.id);
    // let user: string = this.usuario;
    // let token: string = this.token;

    // if (user == 'cliente') {

    //   this.apiService.LogoutCliente(id, token).then((result) => {
    //     console.log(result);
    //   }).catch((erro) => {
    //     console.log(erro);
    //   })
    // } else {
    //   this.apiService.LogoutEntregador(id).then((result) => {
    //     console.log(result);

    //   }).catch((erro) => {
    //     console.log(erro);
    //   })
    // }

    localStorage.removeItem('dadosUsuario');
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('entrega');
    this.navCtrl.navigateRoot('/');
  }

  validaUsuario() {
    if (this.usuario == 'entregador') {
      return true;
    } else {
      return false;
    }
  }

  async toastMsg(msg: string, color: string) {
    if (msg == 'The given data was invalid.') {
      let toast = await this.toastCtrl.create({
        message: 'Os dados inforamdos são inválidos',
        duration: 2000,
        position: 'top',
        color: 'danger',
      });
      toast.present();
    } else {
      let toast = await this.toastCtrl.create({
        message: msg,
        duration: 2000,
        position: 'top',
        color: color,
      });
      toast.present();
    }
  }

  atualizar() {
    if (this.usuario == 'cliente') {
      this.apiService
        .ClientDashboard(this.token)
        .then((res) => {
          console.log(res);
          this.dadosUsuario = res;
          localStorage.setItem('dadosUsuario', JSON.stringify(res));
        })
        .catch((erro) => {
          console.log(erro);
        });
    } else {
      this.apiService
        .DelivererDashboard(this.token)
        .then((res) => {
          console.log(res);
          this.dadosUsuario = res;
          localStorage.setItem('dadosUsuario', JSON.stringify(res));
        })
        .catch((erro) => {
          console.log(erro);
        });
    }
  }
}
