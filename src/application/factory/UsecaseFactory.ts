import { ClassroomRepository } from "../repository/interface/ClassroomRepository";
import { ModuleRepository } from "../repository/interface/ModuleRepository";
import { QuestionRepository } from "../repository/interface/QuestionRepository";
import { ReplyRepository } from "../repository/interface/ReplyRepository";
import { ClassroomUsecase } from "../usercase/Course/ClassroomUsecase";
import { ModuleUsecase } from "../usercase/Module/ModuleUsecase";
import { QuestionUsecase } from "../usercase/Question/QuestionUsecase";
import { ReplyUsecase } from "../usercase/Reply/ReplyUsecase";

export class UsecaseFactory {
  private _classroomRepository: ClassroomRepository
  private _moduleRepository: ModuleRepository
  private _questionRepositorty: QuestionRepository
  private _replyRepository: ReplyRepository
  constructor(courseRepository: ClassroomRepository, moduleRepository: ModuleRepository, questionRepository: QuestionRepository, replyRepository: ReplyRepository) {
    this._classroomRepository = courseRepository
    this._moduleRepository = moduleRepository
    this._questionRepositorty = questionRepository
    this._replyRepository = replyRepository
  }
  Couse() {
    return new ClassroomUsecase(this._classroomRepository)
  }
  Module() {
    return new ModuleUsecase(this._moduleRepository)
  }
  Question() {
    return new QuestionUsecase(this._questionRepositorty)
  }
  Reply() {
    return new ReplyUsecase(this._replyRepository)
  }
}