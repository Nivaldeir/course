import { NextFunction, Request, Response } from "express";
import { Token } from "../../domain/Token"

export class Middleware {
  static isValid(req: Request) {
    const token = req.cookies.token
    if (token) {
      const result = Token.Decode(token);
      if (result!) {
        return result["data"]
      }
    }
    throw new Error("NOT_AUTHENTICATED")
  }
  static isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const result = Middleware.isValid(req)
      if (!result["isAdmin"]) throw new Error("NOT_AUTHENTICATED")
      next()
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  static isValidToUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = Middleware.isValid(req)
      if (!(result["id"] === req.params.id || result["isAdmin"])) throw new Error("NOT_AUTHENTICATED")
      next()
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}