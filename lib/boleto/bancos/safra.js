const path = require('path');
const StringUtils = require('../../utils/string-utils');
const pad = StringUtils.pad;

const CodigoDeBarrasBuilder = require('../codigo-de-barras-builder');

var Safra = (function () {
    var NUMERO_SAFRA = '422',
        DIGITO_SAFRA = '7';

    function Safra() {

    }

    Safra.prototype.getTitulos = function () {
        return {
            localDoPagamento: 'Local de pagamento',
            agenciaECodigoDoBeneficiario: 'Agência / Código Beneficiário',
            dataDocumento: 'Data Documento',
            numeroDoDocumento: 'No documento',
            especieDoDocumento: 'Espécie doc.',
            dataDeProcessamento: 'Data processamento',
            nossoNumero: 'Carteira / Nosso número',
            carteira: 'Carteira',
            especie: 'Espécie',
            quantidade: 'Quantidade',
            valor: '(x) Valor',
            igualDoValorDoDocumento: '(=) ',
            valorDoDocumento: 'Valor documento',
            instrucoes: 'Instruções (Texto de responsabilidade do beneficiário)',
            moraMulta: '(+) Mora / Multa',
            nomeDoPagador: 'Pagador'
        };
    };

    Safra.prototype.exibirReciboDoPagadorCompleto = function () {
        return true;
    };

    Safra.prototype.exibirCampoCip = function () {
        return true;
    };

    Safra.prototype.getLocaisDePagamentoPadrao = function () {
        return ['ATÉ O VENCIMENTO EM QUALQUER BANCO. APÓS O VENCIMENTO SOMENTE NO SAFRA.'];
    };

    Safra.prototype.geraCodigoDeBarrasPara = function (boleto) {
        var beneficiario = boleto.getBeneficiario(),
            campoLivre = [];

        campoLivre.push('7');
        campoLivre.push(this.getAgenciaCampoLivre(beneficiario));
        campoLivre.push(this.getContaCampoLivre(beneficiario));
        campoLivre.push(this.getNossoNumeroCampoLivre(beneficiario));
        campoLivre.push(this.getCarteiraFormatado(beneficiario));

        return new CodigoDeBarrasBuilder(boleto).comCampoLivre(campoLivre);
    };

    Safra.prototype.getAgenciaCampoLivre = function (beneficiario) {
        var agencia = (beneficiario.getAgencia() || '') + (beneficiario.getDigitoAgencia() || '');
        return pad(agencia, 5, '0');
    };

    Safra.prototype.getContaCampoLivre = function (beneficiario) {
        var conta = this.getCodigoFormatado(beneficiario) + (beneficiario.getDigitoCodigoBeneficiario() || '');
        return pad(conta, 9, '0');
    };

    Safra.prototype.getNossoNumeroCampoLivre = function (beneficiario) {
        var nossoNumero = this.getNossoNumeroFormatado(beneficiario) + (beneficiario.getDigitoNossoNumero() || '');
        return pad(nossoNumero, 9, '0');
    };

    Safra.prototype.getNumeroFormatadoComDigito = function () {
        return [
            NUMERO_SAFRA,
            DIGITO_SAFRA
        ].join('-');
    };

    Safra.prototype.getNumeroFormatado = function () {
        return NUMERO_SAFRA;
    };

    Safra.prototype.getCarteiraFormatado = function (beneficiario) {
        var carteira = String(beneficiario.getCarteira() || '2').replace(/^0+/, '') || '2';
        return pad(carteira, 1, '0').slice(-1);
    };

    Safra.prototype.getCarteiraTexto = function (beneficiario) {
        return this.getCarteiraFormatado(beneficiario);
    };

    Safra.prototype.getCodigoFormatado = function (beneficiario) {
        return pad(beneficiario.getCodigoBeneficiario(), 7, '0');
    };

    Safra.prototype.getImagem = function () {
        return path.join(__dirname, 'logotipos/safra.png');
    };

    Safra.prototype.getNossoNumeroFormatado = function (beneficiario) {
        return pad(beneficiario.getNossoNumero(), 8, '0');
    };

    Safra.prototype.getNossoNumeroECodigoDocumento = function (boleto) {
        var beneficiario = boleto.getBeneficiario(),
            nossoNumero = this.getNossoNumeroFormatado(beneficiario),
            digito = beneficiario.getDigitoNossoNumero();

        if (digito !== undefined && digito !== null && digito !== '') {
            return nossoNumero + '-' + digito;
        }

        return nossoNumero;
    };

    Safra.prototype.getNome = function () {
        return 'Banco Safra S.A.';
    };

    Safra.prototype.getImprimirNome = function () {
        return false;
    };

    Safra.prototype.getAgenciaECodigoBeneficiario = function (boleto) {
        var beneficiario = boleto.getBeneficiario(),
            agencia = pad(beneficiario.getAgencia(), 4, '0'),
            digitoAgencia = beneficiario.getDigitoAgencia(),
            codigo = this.getCodigoFormatado(beneficiario),
            digitoCodigo = beneficiario.getDigitoCodigoBeneficiario();

        if (digitoAgencia !== undefined && digitoAgencia !== null && digitoAgencia !== '') {
            agencia += '-' + digitoAgencia;
        }

        if (digitoCodigo !== undefined && digitoCodigo !== null && digitoCodigo !== '') {
            codigo += '-' + digitoCodigo;
        }

        return agencia + ' / ' + codigo;
    };

    Safra.novoSafra = function () {
        return new Safra();
    };

    return Safra;
})();

module.exports = Safra;
