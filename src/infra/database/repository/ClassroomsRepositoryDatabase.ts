import { ClassroomRepository } from "../../../application/repository/interface/ClassroomRepository";
import { Classrooms } from "../../../domain/Classrooms";
import { BaseRepositoryDatabase } from "./default/BaseRepositoryDatabase";

export class ClassroomsRepositoryDatabase extends BaseRepositoryDatabase<Classrooms> implements ClassroomRepository {
  constructor(private pg: any) {
    super(Classrooms, pg)
  }
  findManyQuestionWithReply(): Promise<any> {
    
    throw new Error("Method not implemented.");
  }
}