const { Bancos, Boletos } = require('../lib/index');

const boleto = {
  banco: new Bancos.Itau(),
  pagador: {
    nome: 'EFM COMERCIO DE MATERIAIS DE C',
    RegistroNacional: '30.340.910/0001-84',
    endereco: {
      logradouro: 'R CONSELHEIRO FRANCO, 295',
      bairro: 'CENTRO',
      cidade: 'FEIRA DE SANTAN',
      estadoUF: 'BA',
      cep: '44002128'
    }
  },
  instrucoes: [
    'Sacador/Avalista: SB CREDITO FIDC MULTISSETORIA',
    'CPF/CNPJ: 23956882000169',
    'COD CIVIL ART.308 -LEI 5.474/68 - ART8°',
    'PROTESTO APÓS O 5° DIA DO VENCIMENTO',
    '**VALORES EXPRESSOS EM REAIS**',
    '///ATENÇÃO ////SEGUNDA VIA'
  ],
  beneficiario: {
    nome: 'SB CREDITO FIDC MULTISSETORIA',
    cnpj: '23956882000169',
    dadosBancarios: {
      carteira: '112',
      agencia: '38332',
      agenciaDigito: '0',
      conta: '6660922',
      contaDigito: '6',
      nossoNumero: '94497670',
      nossoNumeroDigito: '6'
    },
    endereco: {
      logradouro: 'Rua Alves Guimarães, 1212',
      bairro: 'Pinheiros',
      cidade: 'São Paulo',
      estadoUF: 'SP',
      cep: '05410002'
    }
  },
  boleto: {
    numeroDocumento: '000240682D',
    especieDocumento: 'DM',
    valor: 1182.86,
    datas: {
      vencimento: '2024-05-30',
      processamento: '2024-02-22',
      documentos: '2024-02-22'
    }
  }
};

const novoBoleto = new Boletos(boleto);
novoBoleto.gerarBoleto();

novoBoleto.pdfFile().catch((err) => {

  // return err;
});

