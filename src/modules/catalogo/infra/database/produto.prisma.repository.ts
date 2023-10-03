import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { ProdutoMap } from "@modules/catalogo/mappers/produto.map";
import { PrismaRepository } from "@shared/infra/database/prisma.repository";

class ProdutoPrismaRepository extends PrismaRepository implements IProdutoRepository<Produto>{

    
}