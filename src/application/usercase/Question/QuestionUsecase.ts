import { Questions } from "../../../domain/Questions";
import { Attributes, Delete, Object, PaginationSearchType } from "../../repository/interface/BaseRepository";
import { QuestionRepository } from "../../repository/interface/QuestionRepository";

export class QuestionUsecase implements QuestionRepository {
  constructor(private readonly _repository: QuestionRepository) { }
  async findManyAndClassrooms(): Promise<any> {
    return await this._repository.findManyAndClassrooms()
  }

  async get(params: Partial<Object<Questions>>): Promise<Questions> {
    return await this._repository.get(params)
  }
  async show(params?: (Partial<Attributes<Questions>> & PaginationSearchType) | undefined): Promise<Questions[]> {
    return await this._repository.show(params)
  }
  async save(data: Object<Questions>): Promise<any> {
    const question = Questions.Create(data)
    await this._repository.save(question)
    return {
      id: question.id
    }
  }
  async delete(params: Delete): Promise<void> {
    return await this._repository.delete(params)
  }
  async update(data: Object<Questions>): Promise<void> {
    return await this._repository.update(data)
  }
  async search(object: Partial<Omit<Object<Questions>, "id">> & PaginationSearchType): Promise<Questions[]> {
    return await this._repository.search(object)
  }
}