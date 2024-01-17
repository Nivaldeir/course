import DatabaseConnection from "./DatabaseConnection";
import pg from "pg-promise"
export class PgAdapter implements DatabaseConnection {
  private connection: any;
  constructor() {
    this.connection = pg()("postgresql://postgres:postgres@host.docker.internal:5432/postgres")
  }
  async query(statement: string, params: any): Promise<any> {
    return await this.connection.query(statement, params)
  }
  async close(): Promise<void> {
    await this.connection.$pool.end();
  }
}