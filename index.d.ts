import {WriteStream} from 'fs';

declare module 'boletos.ts' {
  export interface BoletoInfo {
    banco: Bancos;
    pagador: PagadorInterface;
    boleto: BoletoInterface;
    beneficiario: BeneficiarioInterface;
    instrucoes: string[];
  }

  export interface GerarBoletoResult {
    boleto: Boleto;
    stream: WriteStream;
  }

  export class Boletos {
    constructor(options: BoletoInfo);

    gerarBoleto(): void;

    pdfFile(): Promise<GerarBoletoResult>;

    pdfStream(stream: WriteStream): Promise<GerarBoletoResult>;
  }

  interface PagadorInterface {
    nome: string;
    RegistroNacional: string;
    endereco: EnderecoInterface;
  }

  interface Pagador {
    getNome(): string;

    comNome(nome: string): this;

    getIdentificacao(): string;

    getRegistroNacional(): string;

    getRegistroNacionalFormatado(): string;

    temRegistroNacional(): boolean;

    comCNPJ(cnpj: string): this;

    comCPF(cpf: string): this;

    comRegistroNacional(registroNacional: string): this;

    getDocumento(): string;

    comDocumento(documento: string): this;

    getEndereco(): Endereco;

    comEndereco(endereco: Endereco): this;
  }

  interface BeneficiarioInterface {
    nome: string;
    cnpj: string;
    dadosBancarios: DadosBancariosInterface;
    endereco: EnderecoInterface;
  }

  interface DadosBancariosInterface {
    carteira: string;
    agencia: string;
    agenciaDigito: string;
    conta: string;
    contaDigito: string;
    nossoNumero: string;
    nossoNumeroDigito: string;
  }

  interface Beneficiario {
    getIdentificacao(): string;

    getRegistroNacional(): string;

    getRegistroNacionalFormatado(): string;

    temRegistroNacional(): boolean;

    comCNPJ(cnpj: string): this;

    comCPF(cpf: string): this;

    comRegistroNacional(registroNacional: string): this;

    comAgencia(agencia: string): this;

    getAgencia(): string;

    comCodPosto(posto: string): this;

    getCodposto(): string;

    getAgenciaFormatada(): string;

    comDigitoAgencia(digitoAgencia: string): this;

    getDigitoAgencia(): string;

    comCodigoBeneficiario(codigo: string): this;

    getCodigoBeneficiario(): string;

    getDigitoCodigoBeneficiario(): string;

    comDigitoCodigoBeneficiario(digitoCodigoBeneficiario: string): this;

    getCarteira(): string;

    comCarteira(carteira: string): this;

    getNossoNumero(): string;

    comNossoNumero(nossoNumero: string): this;

    getDigitoNossoNumero(): string;

    comDigitoNossoNumero(digitoNossoNumero: string): this;

    getNome(): string;

    comNome(nomeBeneficiario: string): this;

    getEndereco(): Endereco;

    comEndereco(endereco: Endereco): this;

    getNumeroConvenio(): string;

    comNumeroConvenio(numeroConvenio: string): this;

    getDocumento(): string;

    comDocumento(documento: string): this;
  }

  interface DatasInterface {
    vencimento: string;
    processamento: string;
    documentos: string;
  }

  interface Datas {
    comDocumento(documento: Date | string, locate?: 'usa' | 'brl'): this;

    getDocumento(): Date;

    getDocumentoFormatado(): string;

    comProcessamento(
      processamento: Date | string,
      locate?: 'usa' | 'brl'
    ): this;

    getProcessamento(): Date;

    getProcessamentoFormatado(): string;

    comVencimento(vencimento: Date | string, locate?: 'usa' | 'brl'): this;

    getVencimento(): Date;

    getVencimentoFormatado(): string;
  }

  interface EnderecoInterface {
    logradouro: string;
    bairro: string;
    cidade: string;
    estadoUF: string;
    cep: string;
  }

  interface Endereco {
    getLogradouro(): string;

    comLogradouro(logradouro: string): this;

    getBairro(): string;

    comBairro(bairro: string): this;

    getCep(): string;

    getCepFormatado(): string;

    comCep(cep: string): this;

    getCidade(): string;

    comCidade(cidade: string): this;

    getUf(): string;

    comUf(uf: string): this;

    getPrimeiraLinha(): string;

    getSegundaLinha(): string;

    getEnderecoCompleto(): string;
  }

  interface BoletoInterface {
    numeroDocumento: string;
    especieDocumento: string;
    especieMoeda?: string;
    aceite?: boolean;
    locaisDePagamentos?: string | string[];
    valor: number;
    datas: DatasInterface;
    emv?: string
    imagemQrCode?: string;
  }

  interface Boleto {
    getFatorVencimento(): string;

    comEspecieMoeda(especieMoeda: string): this;

    getEspecieMoeda(): string;

    getCodigoEspecieMoeda(): string;

    comCodigoEspecieMoeda(codigoEspecieMoeda: string | number): this;

    getAceite(): boolean;

    getAceiteFormatado(): string;

    comAceite(aceite: boolean): this;

    getEspecieDocumento(): string;

    comEspecieDocumento(especieDocumento: string): this;

    getDatas(): Datas;

    comDatas(datas: Datas): this;

    getValorFormatado(): string;

    getValorFormatadoBRL(): string;

    getValorBoleto(): number;

    comValorBoleto(valorBoleto: number): this;

    comValor(valorBoleto: number): void;

    getNumeroDoDocumentoFormatado(): string;

    getNumeroDoDocumento(): string;

    comNumeroDoDocumento(numeroDoDocumento: string): this;

    getInstrucoes(): string[];

    comInstrucoes(...instrucoes: string[]): this;

    getDescricoes(): string[];

    comDescricoes(...descricoes: string[]): this;

    getLocaisDePagamento(): string[];

    comLocaisDePagamento(...locaisDePagamento: string[]): this;

    getQuantidadeDeMoeda(): string;

    comQuantidadeDeMoeda(quantidadeDeMoeda: string): this;

    getBanco(): Bancos;

    comBanco(banco: Bancos): this;

    getPagador(): Pagador;

    comPagador(pagador: Pagador): this;

    getBeneficiario(): Beneficiario;

    comBeneficiario(beneficiario: Beneficiario): this;

    getValorDescontosFormatadoBRL(): string;

    getValorDescontos(): number;

    comValorDescontos(valorDescontos: number): this;

    getValorDeducoesFormatadoBRL(): string;

    getValorDeducoes(): number;

    comValorDeducoes(valorDeducoes: number): this;

    getValorMultaFormatadoBRL(): string;

    getValorMulta(): number;

    comValorMulta(valorMulta: number): this;

    getValorAcrescimosFormatadoBRL(): string;

    getValorAcrescimos(): number;

    comValorAcrescimos(valorAcrescimos: number): this;

    getLinhaDigitavelFormatado(): { linha: string; numeroDocumento: string };
  }

  export {Pagador, Beneficiario, Datas, Endereco, Boleto};

  class Itau {
  }

  class Caixa {
  }

  class Bradesco {
  }

  class BancoBrasil {
  }

  class Cecred {
  }

  class Sicoob {
  }

  class Santander {
  }

  class Sicredi {
  }

  class Safra {
  }

  class Qitech {
  }

  class Bancos {
    static Itau: typeof Itau;
    static '341': typeof Itau;
    static Caixa: typeof Caixa;
    static '104': typeof Caixa;
    static Bradesco: typeof Bradesco;
    static '237': typeof Bradesco;
    static BancoBrasil: typeof BancoBrasil;
    static '001': typeof BancoBrasil;
    static Cecred: typeof Cecred;
    static '085': typeof Cecred;
    static Sicoob: typeof Sicoob;
    static '756': typeof Sicoob;
    static Santander: typeof Santander;
    static '033': typeof Santander;
    static Sicredi: typeof Sicredi;
    static '748': typeof Sicredi;
    static Safra: typeof Safra;
    static '422': typeof Safra;
    static Qitech: typeof Qitech;
    static '329': typeof Qitech;
  }

  export {
    Bancos,
    Itau,
    Caixa,
    Bradesco,
    BancoBrasil,
    Cecred,
    Sicoob,
    Santander,
    Sicredi,
    Safra,
    Qitech,
  };
}
