import { categoriaRepositorio } from "@modules/catalogo/infra/database";
import { RecuperarCategoriaPorIdUseCase } from "./recuperar-categoria-por-id/recuperar-categoria-por-id.use-case";

const recuperarCategoriaPorIdUseCase = new RecuperarCategoriaPorIdUseCase(categoriaRepositorio);

export { recuperarCategoriaPorIdUseCase };