import { AlertController } from "@ionic/angular";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ValidaForm {


    constructor(private alertCtrl: AlertController) { }


    async validaProduto(prod: string) {
        if (prod) {
            if (prod.length < 5) {
                const alert = await this.alertCtrl.create({
                    header: 'Conteúdo inválido',
                    message: 'O conteúdo deve ter 5 cáracteres no mínimo',
                    buttons: ['OK']
                });
                alert.present();
                return false;
            } else {
                return true;
            }
        } else {
            const alert = await this.alertCtrl.create({
                header: 'Conteúdo inválido',
                message: 'O conteúdo é um campo obrigatório',
                buttons: ['OK']
            });
            alert.present();
            return false;
        }
    }

    async validaRecebedor(receb: string) {
        if (receb) {
            if (receb.length < 5) {
                const alert = await this.alertCtrl.create({
                    header: 'Recebedor inválido',
                    message: 'O nome do recebedor deve ter 10 cáracteres no mínimo',
                    buttons: ['OK']
                });
                alert.present();
                return false;
            } else {
                return true;
            }
        } else {
            const alert = await this.alertCtrl.create({
                header: 'Recebedor inválido',
                message: 'O nome do recebedor é um campo obrigatório',
                buttons: ['OK']
            });
            alert.present();
            return false;
        }
    }

    MaskCPF(cpf) {
        var X = cpf.length;
        switch (X) {
            case 3:
                cpf = cpf + ".";
                break;
            case 7:
                cpf = cpf + ".";
                break;
            case 11:
                cpf = cpf + "-";
                break;
            default:
                return;
                break;
        }

    }

    MaskTel(telefone) {
        let X = telefone.length;
        switch (X) {
            case 1:
                let num = telefone.charAt(0);
                telefone = telefone.substring(0, X - 1);
                X -= 1;
                telefone = "(" + num;
                break;
            case 3:
                telefone = telefone + ") ";
                break;
            case 10:
                telefone = telefone + "-";
                break;
            case 15:
                console.log(telefone);
                return telefone;


            default:
                return;

        }
    }


    async validaCPF(cpf) {
        if (cpf) {
            let X = cpf.length;
            var char = cpf.charAt(X - 1);
            var caracteresPossiveis = "1 2 3 4 5 6 7 8 9 0 . -";
            if (caracteresPossiveis.includes(char)) {
                return true;
            }
            else {
                cpf = cpf.substring(0, X - 1);
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

    validaTelefone(telefone) {
        if (telefone) {
            let X = telefone.length;
            let char = telefone.charAt(X - 1);
            let caracteresPossiveis = "1 2 3 4 5 6 7 8 9 0 ( ) -";
            if (caracteresPossiveis.includes(char)) {
                return true;
            }
            else {
                telefone = telefone.substring(0, X - 1);
                X -= 1;
                return false;
            }
        } else {
            return false;
        }

    }

    async validaTelefone2(telefone) {
        if (telefone) {
            if (telefone.length < 15) {
                const alert = await this.alertCtrl.create({
                    header: 'Telefone inválido',
                    message: 'Preencha corretamente o campo de telefone!',
                    buttons: ['OK']
                });
                alert.present();
                return false;
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

    async validaSenha(senhaCadastro, confirmasenhaCadastro) {
        if (senhaCadastro && confirmasenhaCadastro) {
            if (senhaCadastro !== confirmasenhaCadastro) {
                const alert = await this.alertCtrl.create({
                    header: 'Senhas diferentes',
                    message: 'As senhas inforamadas são diferentes!',
                    buttons: ['OK']
                });
                alert.present();
                return false;
            } else if (senhaCadastro.length < 8) {
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

    async validaEmailCadastro(emailCadastro) {
        if (emailCadastro) {
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

    async validaNome(nome) {
        if (nome) {
            if (nome.length < 8) {
                const alert = await this.alertCtrl.create({
                    header: 'Nome Curto',
                    message: 'Informe seu nome e sobrenome para continuar!',
                    buttons: ['OK']
                });
                alert.present();
                return false;
            } else if (!nome.includes(" ")) {
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

    async validaCidade(cidadeUF) {
        if (cidadeUF) {
            if (cidadeUF.length < 6) {
                const alert = await this.alertCtrl.create({
                    header: 'Cidada inválida',
                    message: 'Informe o nome da cidade para continuar! ' + cidadeUF,
                    buttons: ['OK']
                });
                alert.present();
                return false;
            } else if (!cidadeUF.includes("-")) {
                const alert = await this.alertCtrl.create({
                    header: 'Cidade inválida',
                    message: 'Preencha corretamente o campo de cidade! ' + cidadeUF,
                    buttons: ['OK']
                });
                alert.present();
                return false;
            } else {
                let idx = cidadeUF.indexOf("-");
                let idxe = cidadeUF.length;
                let cidade = cidadeUF.substring(0, idx);
                let UF = cidadeUF.substring(idx + 1, idxe + 1);
                UF = UF.toUpperCase();
                cidade = cidade.charAt(0).toUpperCase() + cidade.slice(1);
                let CIUF = {
                    cidade: cidade,
                    UF: UF
                }
                return CIUF;
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


    async validaEndereco(endereco) {
        if (endereco) {
            let virgulas = endereco.split(',').length - 1;
            if (virgulas != 2) {
                const alert = await this.alertCtrl.create({
                    header: 'Endereço inválido',
                    message: "Preencha o campo de endereço corretamente para continuar!",
                    buttons: ['OK']
                });
                alert.present();
                return false;
            } else {
                this.formataEndereco(endereco);
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

    formataEndereco(endereco) {
        let idx = endereco.indexOf(',');
        let idx2 = endereco.lastIndexOf(',');
        let idxe = endereco.length;
        let rua = endereco.substring(0, idx);
        let numero = endereco.substring(idx + 1, idx2);
        let bairro = endereco.substring(idx2 + 1, idxe);
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
        let end = {
            numero: numero,
            rua: rua,
            bairro: bairro
        }
        return end;
    }

    async validaPlaca(placa) {
        if (placa) {
            placa = placa.toUpperCase();
            if (placa.length < 7) {
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

    async validaCor(cor) {

        if (cor) {
            if (cor.length < 3) {
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

    async validaModelo(modelo) {

        if (modelo) {
            if (modelo.length < 3) {
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
}