import { Classrooms } from "../../../domain/Classrooms";
import { BaseRepository } from "./BaseRepository";

export interface ClassroomRepository extends BaseRepository<Classrooms> {
  findManyQuestionWithReply(): Promise<any>
}