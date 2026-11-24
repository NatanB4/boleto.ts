const path = require('path');
const StringUtils = require('../../utils/string-utils');
const pad = StringUtils.pad;

const CodigoDeBarrasBuilder = require('../codigo-de-barras-builder');

var Qitech = (function () {
    var NUMERO_QITECH = '329',
        DIGITO_QITECH = '8';

    function Qitech() {

    }

    Qitech.prototype.getTitulos = function () {
        return {
            localDoPagamento: 'Local de pagamento',
            agenciaECodigoDoBeneficiario: 'Agência / Código do Beneficiário',
            dataDocumento: 'Data Documento',
            numeroDoDocumento: 'Nº do Documento',
            especieDoDocumento: 'Espécie Doc.',
            dataDeProcessamento: 'Data Processamento',
            nossoNumero: 'Nosso Número',
            carteira: 'Carteira',
            especie: 'Espécie',
            quantidade: 'Quantidade',
            valor: 'Valor',
            igualDoValorDoDocumento: '',
            valorDoDocumento: 'Valor Documento',
            instrucoes: 'Instruções (texto de responsabilidade do Cedente)',
            moraMulta: '(+) Mora / Multa',
            nomeDoPagador: 'Pagador'
        };
    };

    Qitech.prototype.exibirReciboDoPagadorCompleto = function () {
        return true;
    };

    Qitech.prototype.exibirCampoCip = function () {
        return false;
    };

    Qitech.prototype.getLocaisDePagamentoPadrao = function () {
        return ['PAGAVEL EM QUALQUER BANCO ATE O VENCIMENTO'];
    };

    Qitech.prototype.geraCodigoDeBarrasPara = function (boleto) {
        var beneficiario = boleto.getBeneficiario(),
            campoLivre = [];

        campoLivre.push(beneficiario.getAgenciaFormatada());
        campoLivre.push(this.getCarteiraFormatado(beneficiario));
        campoLivre.push(this.getNossoNumeroFormatado(beneficiario));
        campoLivre.push(this.getCodigoFormatado(beneficiario));
        campoLivre.push('0');

        return new CodigoDeBarrasBuilder(boleto).comCampoLivre(campoLivre);
    };

    Qitech.prototype.getNumeroFormatadoComDigito = function () {
        return [
            NUMERO_QITECH,
            DIGITO_QITECH
        ].join('-');
    };

    Qitech.prototype.getNumeroFormatado = function () {
        return NUMERO_QITECH;
    };

    Qitech.prototype.getCarteiraFormatado = function (beneficiario) {
        return pad(beneficiario.getCarteira(), 2, '0');
    };

    Qitech.prototype.getCarteiraTexto = function (beneficiario) {
        var carteira = String(beneficiario.getCarteira() || '').replace(/^0+/, '');
        return carteira || '0';
    };

    Qitech.prototype.getCodigoFormatado = function (beneficiario) {
        return pad(beneficiario.getCodigoBeneficiario(), 7, '0');
    };

    Qitech.prototype.getImagem = function () {
        return path.join(__dirname, 'logotipos/qitech.png');
    };

    Qitech.prototype.getNossoNumeroFormatado = function (beneficiario) {
        return pad(beneficiario.getNossoNumero(), 11, '0');
    };

    Qitech.prototype.getNossoNumeroECodigoDocumento = function (boleto) {
        var beneficiario = boleto.getBeneficiario(),
            nossoNumero = this.getNossoNumeroFormatado(beneficiario),
            digito = beneficiario.getDigitoNossoNumero();

        if (digito !== undefined && digito !== null && digito !== '') {
            return nossoNumero + '-' + digito;
        }

        return nossoNumero;
    };

    Qitech.prototype.getNome = function () {
        return 'QI Sociedade de Crédito Direto S.A.';
    };

    Qitech.prototype.getImprimirNome = function () {
        return false;
    };

    Qitech.prototype.getAgenciaECodigoBeneficiario = function (boleto) {
        var beneficiario = boleto.getBeneficiario(),
            agencia = beneficiario.getAgencia() || beneficiario.getAgenciaFormatada(),
            codigo = this.getCodigoFormatado(beneficiario),
            digitoCodigo = beneficiario.getDigitoCodigoBeneficiario();

        if (digitoCodigo !== undefined && digitoCodigo !== null && digitoCodigo !== '') {
            codigo += '-' + digitoCodigo;
        }

        return agencia + ' / ' + codigo;
    };

    Qitech.novoQitech = function () {
        return new Qitech();
    };

    return Qitech;
})();

module.exports = Qitech;
