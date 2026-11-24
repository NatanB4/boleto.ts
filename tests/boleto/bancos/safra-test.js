const PdfGerador = require('../../../lib/pdf-gerador');
var fs = require('fs'),
	boletos = require('../../../lib/utils/functions/boletoUtils.js'),
	Safra = require('../../../lib/boleto/bancos/safra.js'),
	geradorDeLinhaDigitavel = require('../../../lib/boleto/gerador-de-linha-digitavel.js'),

	Datas = boletos.Datas,
	Endereco = boletos.Endereco,
	Beneficiario = boletos.Beneficiario,
	Pagador = boletos.Pagador,
	Boleto = boletos.Boleto,

	banco,
	boleto;

module.exports = {
	setUp: function(done) {
		banco = new Safra();

		var datas = Datas.novasDatas();
		datas.comDocumento('2026-11-17');
		datas.comProcessamento('2026-11-17');
		datas.comVencimento('2026-12-04');

		var beneficiario = Beneficiario.novoBeneficiario();
		beneficiario.comNome('FERRAGENS 3F DO BRASIL LTDA');
		beneficiario.comRegistroNacional('02464189000107');
		beneficiario.comAgencia('1400');
		beneficiario.comDigitoAgencia('0');
		beneficiario.comCodigoBeneficiario('0135526');
		beneficiario.comDigitoCodigoBeneficiario('6');
		beneficiario.comCarteira('2');
		beneficiario.comNossoNumero('04557577');
		beneficiario.comDigitoNossoNumero('6');

		var enderecoDoBeneficiario = Endereco.novoEndereco();
		enderecoDoBeneficiario.comLogradouro('Rua Exemplo, 100');
		enderecoDoBeneficiario.comBairro('Centro');
		enderecoDoBeneficiario.comCep('88101450');
		enderecoDoBeneficiario.comCidade('São José');
		enderecoDoBeneficiario.comUf('SC');
		beneficiario.comEndereco(enderecoDoBeneficiario);

		var pagador = Pagador.novoPagador();
		pagador.comNome('GLOBAL IMPORTS KEYS E TECH LTDA');
		pagador.comRegistroNacional('39827871000119');

		var enderecoDoPagador = Endereco.novoEndereco();
		enderecoDoPagador.comLogradouro('RUA JOSE FILOMENO, 86');
		enderecoDoPagador.comBairro('');
		enderecoDoPagador.comCep('88101450');
		enderecoDoPagador.comCidade('SAO JOSE');
		enderecoDoPagador.comUf('SC');
		pagador.comEndereco(enderecoDoPagador);

		boleto = Boleto.novoBoleto();
		boleto.comDatas(datas);
		boleto.comBeneficiario(beneficiario);
		boleto.comBanco(banco);
		boleto.comPagador(pagador);
		boleto.comValor(2014.59);
		boleto.comNumeroDoDocumento('291678/004');
		boleto.comEspecieDocumento('DM');

		done();
	},

	'Nosso número formatado deve ter 8 digitos': function(test) {
		var nossoNumero = banco.getNossoNumeroFormatado(boleto.getBeneficiario());
		test.equals(8, nossoNumero.length);
		test.equals('04557577', nossoNumero);
		test.equals('04557577-6', banco.getNossoNumeroECodigoDocumento(boleto));

		test.done();
	},

	'Carteira formatada deve ter um digito': function(test) {
		var carteiraFormatado = banco.getCarteiraFormatado(boleto.getBeneficiario());

		test.equals(1, carteiraFormatado.length);
		test.equals('2', carteiraFormatado);
		test.done();
	},

	'Conta corrente formatada deve ter sete digitos': function(test) {
		var codigoFormatado = banco.getCodigoFormatado(boleto.getBeneficiario());

		test.equals(7, codigoFormatado.length);
		test.equals('0135526', codigoFormatado);
		test.done();
	},

	'Testa geração de linha digitavel': function(test) {
		var codigoDeBarras = banco.geraCodigoDeBarrasPara(boleto),
			linhaEsperada = '42297.14003 00013.552666 04557.577626 1 16500000201459';

		test.equal(linhaEsperada, geradorDeLinhaDigitavel(codigoDeBarras, banco));
		test.done();
	},

	'Testa código de barras': function(test) {
		var codigoDeBarras = banco.geraCodigoDeBarrasPara(boleto);

		test.equal('42291165000002014597140000013552660455757762', codigoDeBarras);
		test.done();
	},

	'Verifica nome correto do banco': function(test) {
		test.equals(banco.getNome(), 'Banco Safra S.A.');
		test.done();
	},

	'Verifica a numeração correta do banco': function(test) {
		test.equal(banco.getNumeroFormatadoComDigito(), '422-7');
		test.done();
	},

	'Verifica que arquivo de imagem do logotipo existe': function(test) {
		test.ok(fs.existsSync(banco.getImagem()));
		test.done();
	},

	'Verifica deve imprimir o nome do banco no boleto': function(test) {
		test.ok(!banco.getImprimirNome());
		test.done();
	},

	'Exibir campo CIP retorna verdadeiro': function(test) {
		test.equal(banco.exibirCampoCip(), true);
		test.done();
	},

	'Verifica criação de pdf': function(test) {
		new PdfGerador(boleto).pdfFile(
			'../tests/boleto/bancos/boleto-safra.pdf'
		).then(async({path})=>{
			test.ok(fs.existsSync(path));
			test.equal(fs.unlinkSync(path), undefined);
			test.done();
		});
	}
};
