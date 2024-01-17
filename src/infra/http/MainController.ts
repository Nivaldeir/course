import { UsecaseFactory } from '../../application/factory/UsecaseFactory';
import { ClassroomsController } from './Controllers/ClassroomsController';
import { ModuleController } from './Controllers/ModuleController';
import { QuestionController } from './Controllers/QuestionController';
import { ReplyController } from './Controllers/ReplyController';
import { HttpServer } from './HttpServer';
export class MainController {
  constructor(private httpServer: HttpServer, factorUsecase: UsecaseFactory) {
    new ClassroomsController(httpServer, factorUsecase.Couse());
    new ModuleController(httpServer, factorUsecase.Module())
    new QuestionController(httpServer, factorUsecase.Question())
    new ReplyController(httpServer, factorUsecase.Reply())
  }
}