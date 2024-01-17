import { Request } from "express";
import { HttpServer } from "../HttpServer";
import { Middleware } from "../Middleware";
import { Token } from "../../../domain/Token";
import { schemaValidationReplyCreate } from "../SchemaValidation";
import { validationResult } from "express-validator";
import { ReplyUsecase } from "../../../application/usercase/Reply/ReplyUsecase";

export class ReplyController {
  private readonly url = "/reply"
  constructor(private readonly http: HttpServer, private readonly usecase: ReplyUsecase) {
    this.setupRoutes();
  }
  private setupRoutes() {
    // this.http.on("get", `${this.url}/:questionId`, [Middleware.isValidToUser], async (req: Request) => {
    //   let params = req.params.questionId
    //   const output = await this.usecase.show({
    //     questionId: [params]
    //   })
    //   return [output, 200]
    // })
    this.http.on("post", `${this.url}`, [Middleware.isValidToUser, ...schemaValidationReplyCreate], async (req: Request) => {
      const token = Token.Decode(req.cookies.token);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return [{
          errors: errors.array()
        }, 500]
      }
      return [await this.usecase.save(req.body), 200]
    })
    this.http.on("put", `${this.url}/:id`, [Middleware.isValidToUser], async (req: Request) => {
      return [await this.usecase.update({ ...req.body, id: req.params.id }), 200]
    })
    this.http.on("delete", `${this.url}/:id`, [Middleware.isValidToUser], async (req: Request) => {
      return [await this.usecase.delete({
        id: req.params.id
      }), 200]
    })
  }
}

