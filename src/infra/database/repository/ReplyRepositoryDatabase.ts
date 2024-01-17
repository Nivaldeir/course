import { Reply } from "../../../domain/Reply";
import { BaseRepositoryDatabase } from "./default/BaseRepositoryDatabase";

export class ReplyRepositoryDatabase extends BaseRepositoryDatabase<Reply> implements ReplyRepositoryDatabase {
  constructor(private pg: any) {
    super(Reply, pg)
  }
}