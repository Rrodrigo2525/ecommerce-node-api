import { PrismaClient } from "@prisma/client";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { DeepMockProxy, mockDeep, mockReset } from 'vitest-mock-extended';
import { ProdutoPrismaRepository } from "./produto.prisma.repository";
import {StatusProduto } from "@modules/catalogo/domain/produto/produto.types";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { ProdutoMap } from "../mappers/produto.map";
import { produtoIncludeCategoriaPrisma } from "@shared/infra/database/prisma.types";
import { faker } from "@faker-js/faker";

const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
let produtoRepositorio: ProdutoPrismaRepository;
let UUIDValido: string;
let nomeProdutoValido: string;
let descricaoProdutoValido: string;
let valorProdutoValido: number;
let dataCriacaoProduto: Date;
let dataAtualizacaoProduto: Date;
let dataExclusaoProduto: Date;
let statusProduto: StatusProduto;
let categoriaProduto01: Categoria;
let categoriaProduto02: Categoria;

describe('Repositório Prisma: Produto', () => {

    beforeAll(async () => {

        //Passando o prisma mockado para o repositório
        produtoRepositorio = new ProdutoPrismaRepository(prismaMock);

        //Preencendo as variáveis com dados em conformidade com as restrições da regra de negócio
        UUIDValido = faker.string.uuid(); // Retorna um UUID v4
        nomeProdutoValido = faker.string.alpha({length:{min:5,max:50}});
        descricaoProdutoValido = faker.string.alpha({length:{min:10,max:200}});
        valorProdutoValido = faker.number.int({min:1,max:2000 });
        dataCriacaoProduto = faker.date.anytime();
        dataAtualizacaoProduto = faker.date.anytime();
        dataExclusaoProduto = faker.date.anytime();
        statusProduto = StatusProduto.ATIVO;

        //Criando categorias válidas com dados simulados
        categoriaProduto01 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
        categoriaProduto02 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});

    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(prismaMock)
    });

    describe('Recuperar Produto por ID', () => {

        test('Deve Recuperar Um Produto por UUID', async () => {

            const produtoPrisma = {
                id: UUIDValido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValido,
                valor: valorProdutoValido,
                dataCriacao: dataCriacaoProduto,
                dataAtualizacao: dataAtualizacaoProduto,
                dataExclusao: dataExclusaoProduto,
                status: statusProduto,
                categorias: [
                    {
                        produtoId: UUIDValido,
                        categoriaId: categoriaProduto01.id,
                        dataCriacao: new Date(),
                        dataAtualizacao: new Date(),
                        categoria: {
                          id: categoriaProduto01.id,
                          nome: categoriaProduto01.nome,
                          dataCriacao: new Date(),
                          dataAtualizacao: new Date()
                        }
                     }
                ]
            };

            prismaMock.produto.findUnique.mockResolvedValue(produtoPrisma);

            const produto: Produto = ProdutoMap.fromPrismaModelToDomain(produtoPrisma);

            const produtoRecuperado = await produtoRepositorio.recuperarPorUuid(produto.id);
   
            expect(produtoRecuperado).toStrictEqual(produto)
            expect(prismaMock.produto.findUnique).toHaveBeenCalledTimes(1);
            expect(prismaMock.produto.findUnique).toBeCalledWith({
                where: {
                    id: produto.id,
                },
                include: produtoIncludeCategoriaPrisma
            });    


        });

    });

});

  
