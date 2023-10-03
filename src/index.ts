import { Categoria } from '@modules/catalogo/domain/categoria/categoria.entity';
import { CategoriaPrismaRepository } from '@modules/catalogo/infra/database/categoria.prisma.repository';
import { PrismaClient } from '@prisma/client';
import { DomainException } from '@shared/domain/domain.exception';

const prisma = new PrismaClient({
    log: ['query', 'info'],
    errorFormat: 'pretty'
});

async function main() {
   
    prisma.$connect().then(
        async () => {
            console.log('Postgres Conectado');
        }
    );

    const categoriaRepo = new CategoriaPrismaRepository(prisma);
    
    ////////////////////////////////
    //Recuperar Categoria por UUID//
    ////////////////////////////////
    
    //const categoriaRecuperada: Categoria | null = await categoriaRepo.recuperarPorUuid("21c6d449-2902-4d39-9d76-365180e6def9");

    //console.log(categoriaRecuperada);

    /////////////////////////////////
    //Recuperar Todas as Categorias//
    /////////////////////////////////
    
    //const todasCategorias: Array<Categoria> = await categoriaRepo.recuperarTodos();

    //console.log(todasCategorias);

    ////////////////////////////////
    //Verifica se Existe Categoria//
    ////////////////////////////////
    
    //const existeCategoria: boolean = await categoriaRepo.existe("159eaca9-f7be-4668-8344-17ecc8263f3e");

    //console.log(existeCategoria);

     /////////////////////
    //Inserir Categoria//
    /////////////////////
    
    //const categoria: Categoria = Categoria.criar({
    //    nome:'Sala e Quarto'
    //});     

    //const categoriaInserida = await categoriaRepo.inserir(categoria);

    //console.log(categoriaInserida);

    ///////////////////////
    //Atualizar Categoria//
    ///////////////////////
    
    //const categoria: Categoria = Categoria.recuperar({
       // id: "b11bac4a-f225-43c0-8bd2-b6305a4d9e0f",
       // nome: "Banho2"
    //});     

    //const atualizouCategoria: boolean = await categoriaRepo.atualizar(categoria.id,categoria);

    //console.log(atualizouCategoria)

     /////////////////////
    //Deletar Categoria//
    /////////////////////
    
    //const categoriaDeletada: boolean = await categoriaRepo.deletar("b11bac4a-f225-43c0-8bd2-b6305a4d9e0f");
    
    //console.log(categoriaDeletada);


}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
       if (error instanceof DomainException) {
           console.log('Execeção de Dóminio');
           console.log(error.message);
       }
       else {
           console.log('Outras Exceções');
           console.log(error.message);
       }
       await prisma.$disconnect()
       process.exit(1)
   })