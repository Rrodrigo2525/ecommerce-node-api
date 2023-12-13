import { NextFunction, Request, Response } from "express";
import { RecuperarCategoriaPorIdUseCase } from "@modules/catalogo/application/use-case/recuperar-categoria-por-id/recuperar-categoria-por-id.use-case";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { ICategoria } from "@modules/catalogo/domain/categoria/categoria.types";
import { CategoriaApplicationExceptions } from "@modules/catalogo/application/exception/categoria.application.exception";
import { HttpErrors } from "@shared/presentation/http/http.error";


class RecuperarCategoriaPorIdExpressController extends ExpressController {

    private _recuperarCategoriaPorIdUseCase: RecuperarCategoriaPorIdUseCase;
 
    constructor(recuperarCategoriaPorIdUseCase: RecuperarCategoriaPorIdUseCase) {
        super();
        this._recuperarCategoriaPorIdUseCase = recuperarCategoriaPorIdUseCase;
    }
 
    async recuperar(request: Request, response: Response, next: NextFunction) {
      try {
        const uuid:string = request.params.id;
        const categoriaDTO: ICategoria = await this._recuperarCategoriaPorIdUseCase.execute(uuid);
        this.sendSuccessResponse(response,categoriaDTO);
      } catch (error) {
        if (error instanceof CategoriaApplicationExceptions.CategoriaNaoEncontrada){
          error = new HttpErrors.NotFoundError({ message: error.message });
        }
          next(error);
      }
      
    }
 
  }

export { RecuperarCategoriaPorIdExpressController }