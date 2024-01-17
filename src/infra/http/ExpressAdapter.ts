import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Response, Request } from 'express';
import { HttpServer } from './HttpServer';
import logger from '../logger';
import session from "express-session"
export class ExpressAdapter implements HttpServer {
  app: any;
  constructor() {
    this.app = express();
    this.app.set("trust proxy", true);
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(session({
      secret: process.env.SESSION_SECURITY!,
      saveUninitialized: true,
      cookie: {
        maxAge: 2000,
        secure: true
      },
      resave: true
    }))
  }

  on(method: string, url: string, middlewares: Function[], callback: Function): void {
    this.app[method](url, ...middlewares, async function (req: Request, res: Response) {
      try {
        for (const middleware of middlewares) {
          await new Promise((resolve) => middleware(req, res, resolve));
        }
        const [output, statusCode] = await callback(req, res)
        res.json(output).status(statusCode);
      } catch (error: any) {
        res.status(500).send({
          error: error.message
        });
      }
    });
  }

  listen(port: number, host?: string) {
    this.app.listen(port, host);
    logger.info(`[EXPRESS]: Connected this ${port}`);
  }
}
