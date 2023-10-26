import { PrismaClient } from "@prisma/client";
import { DeepMockProxy, mockDeep, mockReset } from "vitest-mock-extended";
import { ProdutoPrismaRepository } from "./produto.prisma.repository";
import { afterEach, beforeAll, expect, test, vi, describe } from "vitest";
import { faker } from "@faker-js/faker";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { ProdutoMap } from "../mappers/produto.map";
import { StatusProduto } from "@modules/catalogo/domain/produto/produto.types";
import { produtoIncludeCategoriaPrisma } from "@shared/infra/database/prisma.types";






const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
let produtoRepositorio: ProdutoPrismaRepository;
let UUIDValido: string;



describe('Repositório Prisma: Produto', () => {

    beforeAll(async () => {

        produtoRepositorio = new ProdutoPrismaRepository(prismaMock);
        UUIDValido = faker.string.uuid(); // Retorna um UUID v4
        


    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(prismaMock);
    });

    describe('Recuperar Produto por ID', () => {

        test('Deve Recuperar Uma Produto por UUID', async () => {

            const ProdutoPrisma = {
                id: UUIDValido,
                nome: 'nomeProduto',
                descricao: 'descricao teste',
                valor: 0,
                dataCriacao: faker.date.anytime(),
                dataAtualizacao: faker.date.anytime(),
                dataExclusao: faker.date.anytime(),
                status: StatusProduto.ATIVO,
                categorias: [
                  {
                    produtoId: 'e5eeda5d-cf95-4ac4-a7fe-128897d31f12',
                    categoriaId: '159eaca9-f7be-4668-8344-17ecc8263f3e',
                    dataCriacao: faker.date.anytime(),
                    dataAtualizacao: faker.date.anytime(),
                    categoria: {
                        id: '159eaca7-f7be-4668-8344-17ecc8263f3e',
                        nome: 'Mesa',
                        dataCriacao: faker.date.anytime(),
                        dataAtualizacao: faker.date.anytime()
                    }
                  },
                  {
                    produtoId: 'e5eeda5d-cf95-4ac4-a7fe-128897d31f12',
                    categoriaId: '21c6d449-2902-4d39-9d76-365180e6def9',
                    dataCriacao: faker.date.anytime(),
                    dataAtualizacao: faker.date.anytime(),
                    categoria: {
                        id: '189eaca9-f7be-4668-8344-17ecc8263f3e',
                        nome: 'nomeCategoria',
                        dataCriacao: faker.date.anytime(),
                        dataAtualizacao: faker.date.anytime(),
                    }
                  }
                ]
              };

            prismaMock.produto.findUnique.mockResolvedValue(ProdutoPrisma);

            const produto: Produto = ProdutoMap.fromPrismaModelToDomain(ProdutoPrisma);

            const produtoRecuperado = await produtoRepositorio.recuperarPorUuid(produto.id);

            expect(produtoRecuperado).toEqual(produto);
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



  
