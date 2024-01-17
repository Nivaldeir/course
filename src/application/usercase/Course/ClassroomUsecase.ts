import { Classrooms } from "../../../domain/Classrooms";
import { Object, Attributes, PaginationSearchType, Delete } from "../../repository/interface/BaseRepository";
import { ClassroomRepository } from "../../repository/interface/ClassroomRepository";

export class ClassroomUsecase implements ClassroomRepository {
  constructor(private readonly _repository: ClassroomRepository) { }
  findManyQuestionWithReply(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async get(params: Partial<Object<Classrooms>>): Promise<Classrooms> {
    return await this._repository.get(params)
  }
  async show(params?: (Partial<Attributes<Classrooms>> & PaginationSearchType) | undefined): Promise<Classrooms[]> {
    return await this._repository.show(params)
  }
  async save(data: Object<Classrooms>): Promise<any> {
    const classroom = Classrooms.Create(data)
    await this._repository.save(classroom)
    return {
      id: classroom.id
    }
  }
  async delete(params: Delete): Promise<void> {
    return await this._repository.delete(params)
  }
  async update(data: Object<Classrooms>): Promise<void> {
    return await this._repository.update(data)
  }
  async search(object: Partial<Omit<Object<Classrooms>, "id">> & PaginationSearchType): Promise<Classrooms[]> {
    return await this._repository.search(object)
  }
}