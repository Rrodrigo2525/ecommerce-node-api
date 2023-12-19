import { IUseCase } from "@shared/application/use-case.interface";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProduto } from "@modules/catalogo/domain/produto/produto.types";
import { ProdutoMap } from "@modules/catalogo/infra/mappers/produto.map";

class RecuperarTodosProdutosUseCase implements IUseCase<void, Array<IProduto>> {
    private _produtoRepositorio: IProdutoRepository<Produto>;
 
    constructor(repositorio: IProdutoRepository<Produto>) {
      this._produtoRepositorio = repositorio;
    }
 
    async execute(): Promise<Array<IProduto>> {

        const todosProdutos: Array<Produto> = await this._produtoRepositorio.recuperarTodos();

        const todosProdutosDTO = todosProdutos.map(
            (Produtos) => ProdutoMap.toDTO(Produtos)
        );

        return todosProdutosDTO;
    }
}

export { RecuperarTodosProdutosUseCase };