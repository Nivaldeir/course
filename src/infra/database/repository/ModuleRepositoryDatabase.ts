import { ModuleRepository } from "../../../application/repository/interface/ModuleRepository";
import { Classrooms } from "../../../domain/Classrooms";
import { Modules } from "../../../domain/Modules";
import { BaseRepositoryDatabase } from "./default/BaseRepositoryDatabase";

export class ModuleRepositoryDatabase extends BaseRepositoryDatabase<Modules> implements ModuleRepository {
  constructor(private pg: any) {
    super(Modules, pg)
  }
}