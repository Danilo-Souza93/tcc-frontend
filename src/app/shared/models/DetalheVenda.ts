import { Produto } from "./Produto";
import { Venda } from "./Venda";

export interface DetalheVenda {
    venda: Venda,
    produtosList: Array<Produto>
}
