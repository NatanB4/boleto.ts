const { randomUUID } = require('crypto');
const { Bancos, Boletos, streamToPromise } = require('../lib/index');
const fs = require('fs');

const boleto = {
  banco: new Bancos.Bradesco(),
  pagador: {
    nome: 'LKR MATERIAIS PARA CONSTRUCAO LTDA',
    RegistroNacional: '02654560000195',
    endereco: {
      logradouro: 'AV MARGINAL 1192',
      bairro: 'JARDIM ANITA CASELLI',
      cidade: 'MAGDA',
      estadoUF: 'SP',
      cep: '15310000'
    }
  },
  instrucoes: [
    'JUROS POR DIA DE ATRASO R$ 2.98',
    'APOS VENCIMENTO, MULTA DE R$ 0',
    '',
    'Caso não seja efetuado o pagamento em até 5 dias úteis após o vencimento,',
    'o mesmo será protestado em cartório.'
  ],
  beneficiario: {
    nome: 'FERRAGENS 3F DO BRASIL EIRELI',
    cnpj: '02464189000107',
    dadosBancarios: {
      carteira: '09',
      agencia: '1332',
      agenciaDigito: '3',
      conta: '0107371',
      contaDigito: '',
      nossoNumero: '40640000060',
      nossoNumeroDigito: '2'
    },
    endereco: { logradouro: '', bairro: '', cidade: '', estadoUF: '', cep: '' }
  },
  boleto: {
    numeroDocumento: '000241234',
    especieDocumento: 'DM',
    valor: 994.89,
    datas: {
      vencimento: '2024-05-06',
      processamento: '2024-03-04',
      documentos: '2024-03-04'
    }
  }
};

const novoBoleto = new Boletos(boleto);
novoBoleto.gerarBoleto();

novoBoleto.pdfFile(undefined, undefined, function (pdf, x, y, sac) {
  pdf.font('negrito')
    .fontSize(8)
    .text('Sacador/Avalista:', sac.x + 11, sac.y - 26, {
      lineBreak: false,
      width: 294,
      align: 'left'
    });

  pdf.font('negrito')
    .fontSize(8)
    .text('Sacador/Avalista:', sac.x + 11, sac.y - 366, {
      lineBreak: false,
      width: 294,
      align: 'left'
    });

  pdf.font('normal')
    .fontSize(8)
    .text('FERRAGENS 3F DO BRASIL EIRELI / CNPJ: 02.464.189/0001-07', sac.x + 81, sac.y - 366, {
      lineBreak: false,
      width: 294,
      align: 'left'
    });


  pdf.font('normal')
    .fontSize(8)
    .text('FERRAGENS 3F DO BRASIL EIRELI / CNPJ: 02.464.189/0001-07', sac.x + 91, sac.y - 26, {
      lineBreak: false,
      width: 294,
      align: 'left'
    });

}, true).then(async (result) => {

  console.log(result);
}).catch((error) => {
  return error;
});

