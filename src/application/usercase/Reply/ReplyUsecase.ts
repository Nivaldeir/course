import { Reply } from "../../../domain/Reply";
import { Attributes, Delete, Object, PaginationSearchType } from "../../repository/interface/BaseRepository";
import { ReplyRepository } from "../../repository/interface/ReplyRepository";

export class ReplyUsecase implements ReplyRepository {
  constructor(private readonly _repository: ReplyRepository) { }

  async get(params: Partial<Object<Reply>>): Promise<Reply> {
    return await this._repository.get(params)
  }
  async show(params?: (Partial<Attributes<Reply>> & PaginationSearchType) | undefined): Promise<Reply[]> {
    return await this._repository.show(params)
  }
  async save(data: Object<Reply>): Promise<any> {
    const reply = Reply.Create(data)
    await this._repository.save(reply)
    return {
      id: reply.id
    }
  }
  async delete(params: Delete): Promise<void> {
    return await this._repository.delete(params)
  }
  async update(data: Object<Reply>): Promise<void> {
    console.log(data)
    return await this._repository.update(data)
  }
  async search(object: Partial<Omit<Object<Reply>, "id">> & PaginationSearchType): Promise<Reply[]> {
    return await this._repository.search(object)
  }
}