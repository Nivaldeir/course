import { Request } from "express";
import { HttpServer } from "../HttpServer";
import { Middleware } from "../Middleware";
import { Token } from "../../../domain/Token";
import { schemaValidationQuestinCreate } from "../SchemaValidation";
import { validationResult } from "express-validator";
import { QuestionUsecase } from "../../../application/usercase/Question/QuestionUsecase";

export class QuestionController {
  private readonly url = "/questions"
  constructor(private readonly http: HttpServer, private readonly usecase: QuestionUsecase) {
    this.setupRoutes();
  }
  private setupRoutes() {
    this.http.on("get", `${this.url}`, [Middleware.isValidToUser], async (req: Request) => {
      if (req.query.replys) {
        return [await this.usecase.findManyAndClassrooms(), 200]
      }
      return [await this.usecase.show(req.query as any), 200]
    })
    this.http.on("get", `${this.url}/replys`, [Middleware.isValidToUser], async (req: Request) => {
    })
    this.http.on("post", `${this.url}`, [Middleware.isValidToUser, ...schemaValidationQuestinCreate], async (req: Request) => {
      const token = Token.Decode(req.cookies.token);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return [{
          errors: errors.array()
        }, 500]
      }
      return [await this.usecase.save(req.body), 200]
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

