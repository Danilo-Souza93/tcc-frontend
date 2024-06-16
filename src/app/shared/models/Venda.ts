import { DadosPagamento } from "./DadosPagamento";
import { DadosPessoais } from "./DadosPessoais";
import { Endereco } from "./Endereco";
import { ProdutosVendios } from "./ProdutosVendios";

export interface Venda {
    id?: string;
    vendaId?: string; // tipo Guid/Uuid;
    status: string;
    valorTotal: number;
    endereco: Endereco;
    produtosVendidos: Array<ProdutosVendios>;
    dadosPessoais: DadosPessoais;
    dadosPagamento: DadosPagamento;
}
