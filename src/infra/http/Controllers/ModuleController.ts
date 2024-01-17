import { Request } from "express";
import { HttpServer } from "../HttpServer";
import { Middleware } from "../Middleware";
import { Token } from "../../../domain/Token";
import { schemaValidationModuleCreate } from "../SchemaValidation";
import { validationResult } from "express-validator";
import { ModuleUsecase } from "../../../application/usercase/Module/ModuleUsecase";

export class ModuleController {
  private readonly url = "/module"
  constructor(private readonly http: HttpServer, private readonly usecase: ModuleUsecase) {
    this.setupRoutes();
  }
  private setupRoutes() {
    this.http.on("get", `${this.url}`, [Middleware.isValidToUser], async (req: Request) => {
      return [await this.usecase.show(req.query as any), 200]
    })
    this.http.on("post", `${this.url}`, [Middleware.isValidToUser, ...schemaValidationModuleCreate], async (req: Request) => {
      const token = Token.Decode(req.cookies.token);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return [{
          errors: errors.array()
        }, 500]
      }
      return [await this.usecase.save({ ...req.body, teacherId: token.data.id }), 200]
    })
    this.http.on("put", `${this.url}`, [Middleware.isValidToUser], async (req: Request) => {
      return [await this.usecase.update(req.body), 200]
    })
    this.http.on("delete", `${this.url}/:id`, [Middleware.isValidToUser], async (req: Request) => {
      return [await this.usecase.delete({
        id: req.params.id
      }), 200]
    })
  }
}

