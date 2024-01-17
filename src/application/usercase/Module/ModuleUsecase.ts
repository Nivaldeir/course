import { Modules } from "../../../domain/Modules";
import { Attributes, Delete, Object, PaginationSearchType } from "../../repository/interface/BaseRepository";
import { ModuleRepository } from "../../repository/interface/ModuleRepository";

export class ModuleUsecase implements ModuleRepository {
  constructor(private readonly _repository: ModuleRepository) { }
  async get(params: Partial<Object<Modules>>): Promise<Modules> {
    return await this._repository.get(params)
  }
  async show(params?: (Partial<Attributes<Modules>> & PaginationSearchType) | undefined): Promise<Modules[]> {
    return await this._repository.show(params)
  }
  async save(data: Object<Modules>): Promise<any> {
    const module = Modules.Create(data)
    await this._repository.save(module)
    return {
      id: module.id
    }
  }
  async delete(params: Delete): Promise<void> {
    return await this._repository.delete(params)
  }
  async update(data: Object<Modules>): Promise<void> {
    return await this._repository.update(data)
  }
  async search(object: Partial<Omit<Object<Modules>, "id">> & PaginationSearchType): Promise<Modules[]> {
    return await this._repository.search(object)
  }
}