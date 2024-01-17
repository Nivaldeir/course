import { UsecaseFactory } from "./application/factory/UsecaseFactory";
import { PgAdapter } from "./infra/database/PgAdapter";
import { ClassroomsRepositoryDatabase } from "./infra/database/repository/ClassroomsRepositoryDatabase";
import { ModuleRepositoryDatabase } from "./infra/database/repository/ModuleRepositoryDatabase";
import { QuestionRepositoryDatabase } from "./infra/database/repository/QuestionRepositoryDatabase";
import { ReplyRepositoryDatabase } from "./infra/database/repository/ReplyRepositoryDatabase";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { MainController } from "./infra/http/MainController";

const expressAdapter = new ExpressAdapter()
const pg = new PgAdapter()
const courseRepository = new ClassroomsRepositoryDatabase(pg)
const moduleRepository = new ModuleRepositoryDatabase(pg)
const questionRepository = new QuestionRepositoryDatabase(pg)
const replyRepository = new ReplyRepositoryDatabase(pg)
const usecase = new UsecaseFactory(courseRepository, moduleRepository, questionRepository, replyRepository)
new MainController(expressAdapter, usecase)
expressAdapter.listen(3001)