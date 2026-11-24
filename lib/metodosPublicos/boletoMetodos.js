const fs = require('fs');
const Boleto = require('../utils/functions/boletoUtils');
const BoletoStringify = require('../stringify/boletoStringify');

module.exports = class Boletos {
    constructor({ banco, pagador, boleto, beneficiario, instrucoes }) {
        this.banco = banco;
        this.pagador = pagador;
        this.boleto = boleto;
        this.beneficiario = beneficiario;
        this.instrucoes = instrucoes;
        this.boletoInfo;
    }

    gerarBoleto() {
        const dataInstance = Boleto.Datas;
        const {
            datas,
            valor,
            especieDocumento,
            especieMoeda,
            numeroDocumento,
            locaisDePagamentos,
            imagemQrCode,
            aceite
        } = this.boleto;

        this.boletoInfo = Boleto.Boleto.novoBoleto()
            .comDatas(dataInstance.novasDatas()
                .comVencimento(datas.vencimento)
                .comProcessamento(datas.processamento)
                .comDocumento(datas.documentos))
            .comBeneficiario(BoletoStringify.createBeneficiario(this.beneficiario))
            .comPagador(BoletoStringify.createPagador(this.pagador))
            .comBanco(this.banco)
            .comAceite(Boolean(aceite))
            .comValorBoleto(parseFloat(valor).toFixed(2))
            .comNumeroDoDocumento(numeroDocumento)
            .comEspecieDocumento(especieDocumento)
            .comInstrucoes(BoletoStringify.createInstrucoes(this.instrucoes))
            .comQrCode(imagemQrCode);

        if (especieMoeda) {
            this.boletoInfo.comEspecieMoeda(especieMoeda);
        }

        if (locaisDePagamentos && (!Array.isArray(locaisDePagamentos) || locaisDePagamentos.length)) {
            this.boletoInfo.comLocaisDePagamento(BoletoStringify.createLocais(locaisDePagamentos));
        }
    }


    pdfFile(dir = './tmp/boletos', filename = 'boleto', informacoesPersonalizadas = () => { }, exibirInformacoes = false) {
        return new Promise((resolve, reject) => {
            new Boleto.Gerador(this.boletoInfo).gerarPDF({
                creditos: '',
                informacoesPersonalizadas,
                exibirInformacoes,
                base64: true,
            }).then((base64) => {
                return resolve(base64);
            }).
                catch(err => {
                    reject(err);
                });
        });
    }


    pdfStream(stream, informacoesPersonalizadas = () => { }, exibirInformacoes = false) {
        return new Promise((resolve) => new Boleto.Gerador(this.boletoInfo).gerarPDF({
            creditos: '',
            stream,
            informacoesPersonalizadas,
            exibirInformacoes
        }).then(() => resolve({ boleto: this.boleto, stream })));
    }
};
