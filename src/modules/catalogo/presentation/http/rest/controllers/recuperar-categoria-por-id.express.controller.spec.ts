
import { CategoriaApplicationExceptions } from "@modules/catalogo/application/exception/categoria.application.exception";
import { RecuperarCategoriaPorIdUseCase } from "@modules/catalogo/application/use-case/recuperar-categoria-por-id/recuperar-categoria-por-id.use-case";
import { ICategoria } from "@modules/catalogo/domain/categoria/categoria.types";
import { Request, Response } from "express";
import { Mock, afterEach, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RecuperarCategoriaPorIdExpressController } from "./recuperar-categoria-por-id.express.controller";



let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let recuperarCategoriaPorIdUseCaseMock:  MockProxy<RecuperarCategoriaPorIdUseCase>;
let recuperarCategoriaPorIdController: RecuperarCategoriaPorIdExpressController;

describe('Controller Express: Recuperar Categoria por ID', () => {

    beforeAll(async () => {
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        recuperarCategoriaPorIdUseCaseMock = mock<RecuperarCategoriaPorIdUseCase>();
        recuperarCategoriaPorIdController = new RecuperarCategoriaPorIdExpressController(recuperarCategoriaPorIdUseCaseMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(recuperarCategoriaPorIdUseCaseMock);
    });

    test('Deve Recuperar Uma Categoria por UUID', async () => {

        //Dado (Given)
        const categoriaInputDTO: ICategoria = {
            id: "21c6d449-2902-4d39-9d76-365180e6def9",
            nome: "banho"
        }

        requestMock.params.id = categoriaInputDTO.id as string;
        recuperarCategoriaPorIdUseCaseMock.execute.mockResolvedValue(categoriaInputDTO);
        responseMock.status.mockReturnThis();

        //Quando (When)
        await recuperarCategoriaPorIdController.recuperar(requestMock, responseMock, nextMock);

        //Então (Then
		expect(recuperarCategoriaPorIdUseCaseMock.execute).toHaveBeenCalledWith(categoriaInputDTO.id);
        expect(responseMock.status).toHaveBeenCalledWith(200);
        expect(responseMock.json).toHaveBeenCalledWith(categoriaInputDTO);
        expect(nextMock).not.toHaveBeenCalled();

    });

    test('Deve Tratar uma Exceção de Categoria Não Encontrada', async () => {

        //Dado (Given)
        const categoriaInputDTO: ICategoria = {
            id: "21c6d449-2902-4d39-9d76-365180e6def9",
            nome: "banho"
        }

        requestMock.params.id = categoriaInputDTO.id as string;
        recuperarCategoriaPorIdUseCaseMock.execute.mockRejectedValue(new CategoriaApplicationExceptions.CategoriaNaoEncontrada());
        responseMock.status.mockReturnThis();

        //Quando (When) 
        await recuperarCategoriaPorIdController.recuperar(requestMock, responseMock, nextMock);

        expect(recuperarCategoriaPorIdUseCaseMock.execute).toHaveBeenCalledWith(categoriaInputDTO.id);
        expect(nextMock).toHaveBeenCalled();
        expect(nextMock.mock.lastCall[0].name).toBe(CategoriaApplicationExceptions.CategoriaNaoEncontrada.name);

    });

});