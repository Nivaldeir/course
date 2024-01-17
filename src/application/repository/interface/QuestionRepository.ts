import { Questions } from "../../../domain/Questions";
import { BaseRepository } from "./BaseRepository";

export interface QuestionRepository extends BaseRepository<Questions> {
  findManyAndClassrooms(): Promise<any>
}