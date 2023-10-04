import { Categoria } from '@modules/catalogo/domain/categoria/categoria.entity';
import { CategoriaPrismaRepository } from '@modules/catalogo/infra/database/categoria.prisma.repository';
import { PrismaClient } from '@prisma/client';
import { DomainException } from '@shared/domain/domain.exception';
import { ProdutoPrismaRepository } from '@modules/catalogo/infra/database/produto.prisma.repository';

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
    
    const produtoRepo =  new ProdutoPrismaRepository(prisma);


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
    
    // const categoria: Categoria = Categoria.criar({
    //     nome:'Sala '
    // });     

    // const categoriaInserida = await categoriaRepo.inserir(categoria);

    // console.log(categoriaInserida);

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


     ////////////////////////////////
     //Recuperar Produto por UUID//
    ////////////////////////////////
   
    // const produtoRecuperado: Produto | null = await produtoRepo.recuperarPorUuid("7061d559-ab25-4182-98ce-170afdf2acd2");

    // console.log(produtoRecuperado);

    ///////////////////
    //Inserir Produto//
    ///////////////////

    // const categoria01: Categoria = Categoria.recuperar({
    //     id: "867b9b7b-84e7-4a9e-9026-68b6142a7ba6",
    //     nome: 'Sala'
    // });    

    // const categoria02: Categoria = Categoria.recuperar({
    //     id: "1b8f9b85-55f5-4515-bbc3-e4b6aa59d7fd",
    //     nome: 'Banho'
    // });

    // const produto: Produto = Produto.criar({
    //     nome:'Toalha de mesa',
    //     descricao:'toalha de algodão',
    //     valor:40,
    //     categorias:[categoria01,categoria02]
    //  });

    // const produtoInserido = await produtoRepo.inserir(produto);

    // console.log(produtoInserido);


    


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