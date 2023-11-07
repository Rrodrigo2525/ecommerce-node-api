import { categoriaRepositorio } from "@modules/catalogo/infra/database";
import { RecuperarCategoriaPorIdUseCase } from "./recuperar-categoria-por-id/recuperar-categoria-por-id.use-case";
import { RecuperarTodasCategoriasUseCase } from "./recuperar-todas-categorias/recuperar-todas-categorias.use-case";
import { InserirCategoriaUseCase } from "./inserir-categoria/inserir-categoria.use-case";
import { AtualizarCategoriaUseCase } from "./atualizar-categoria/atualizar-categoria.use-case";
import { DeletarCategoriaUseCase } from "./deletar-categoria/deletar-categoria.use-case";

const recuperarCategoriaPorIdUseCase = new RecuperarCategoriaPorIdUseCase(categoriaRepositorio);
const recuperarTodasCategorias = new RecuperarTodasCategoriasUseCase(categoriaRepositorio);
const inserirCategoriaUseCase = new InserirCategoriaUseCase(categoriaRepositorio);
const atualizarCategoriaUseCase =  new AtualizarCategoriaUseCase(categoriaRepositorio);
const deletarCategoriaUseCase = new DeletarCategoriaUseCase(categoriaRepositorio);

export {
    recuperarCategoriaPorIdUseCase,
    recuperarTodasCategorias,
    inserirCategoriaUseCase,
    atualizarCategoriaUseCase,
    deletarCategoriaUseCase
}
