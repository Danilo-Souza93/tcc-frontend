export interface DadosPagamento {
    cartao: Cartao;
}

export interface Cartao {
    numeroCartao: string;
    codigoSeguranca: string;
    dtValidade: string;
    nomeCartao: string;
    bandeira: string;
    tipo: string;
}
