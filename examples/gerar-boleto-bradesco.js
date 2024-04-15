const { randomUUID } = require('crypto');
const {Bancos, Boletos, streamToPromise} = require('../lib/index');
const fs = require('fs');

const boleto = {
        banco: new Bancos.Bradesco(),
        pagador: {
          nome: 'NATO E NANDA MODA INFANTO JUVENIL LTDA EPP',
          registroNacional: '04926156000159',
          endereco: {
            logradouro: 'R CATETE, 821',
            bairro: 'CATETE',
            cidade: 'EUGENOPOLIS',
            estadoUF: 'MG',
            cep: '36855000'
          }
        },
        instrucoes: [
          'JUROS POR DIA DE ATRASO R$ 0,88',
          'APOS VENCIMENTO, MULTA DE R$ 1,5',
          '',
          'Caso não seja efetuado o pagamento em até 5 dias úteis após o vencimento,',
          'o mesmo será protestado em cartório.'
        ],
        beneficiario: {
          nome: 'RIOS COMERCIO IMPORTACAO E EXPORTACAO LTDA',
          cnpj: '38875449000176',
          dadosBancarios: {
            carteira: '09',
            agencia: '549',
            agenciaDigito: '9',
            conta: '0098500',
            contaDigito: '0',
            nossoNumero: '00000058912',
            nossoNumeroDigito: '0'
          },
          endereco: { logradouro: '', bairro: '', cidade: '', estadoUF: '', cep: '' }
        },
        boleto: {
          locaisDePagamentos: ['Pagável em qualquer agência bancária até o vencimento.'],
          numeroDocumento: '087762/2',
          especieDocumento: 'DM',
          localDoPagamento: 'Minha casa',
          valor: 879,
          datas: {
            vencimento: '2024-06-03',
            processamento: '2024-04-04',
            documentos: '2024-04-04'
          }
        }
};

const novoBoleto = new Boletos(boleto);
novoBoleto.gerarBoleto();


// const pdf = `${randomUUID()}.pdf`;

// const stream = fs.createWriteStream(`./tmp/boletos/${pdf}`);

// novoBoleto.pdfStream(stream);


novoBoleto.pdfFile().then(async ({stream}) => {
    // ctx.res.set('Content-type', 'application/pdf');
    await streamToPromise(stream);
}).catch((error) => {
    return error;
});

