import { Attributes, BaseRepository, Delete, GetAttributes, Object, PaginationSearchType } from "../../../../application/repository/interface/BaseRepository";
import DatabaseConnection from "../../DatabaseConnection";
import { BaseRepositoryMethod } from "./BaseRepositoryMethod";

export class BaseRepositoryDatabase<T> extends BaseRepositoryMethod implements BaseRepository<T>{
    private readonly createInstance: Constructor<T>;
    private tableName: string
    constructor(createInstance: Constructor<T>, private readonly client: DatabaseConnection) {
        super()
        this.createInstance = createInstance;
        this.tableName = createInstance.name
    }
    async show(params?: (Partial<Attributes<T>> & PaginationSearchType) | undefined): Promise<T[]> {
        let queryPage = ''
        if (params?.page) {
            queryPage = `LIMIT ${params.take} OFFSET (${params?.page - 1}) * ${params.take}`
        }
        const result = this.getPropertiesArrayAndValuesArrayToQuery(params)
        let query = `SELECT * FROM ${this.tableName} ${result} ${queryPage}`
        const output = await this.client.query(query, []);
        return output.map((e: any) => new this.createInstance(e));
    }

    async get(params: Partial<GetAttributes<T>>): Promise<T> {
        const [conditions, values] = this.getPropertiesAndValuesToQuery(params)
        let queryWhere = `WHERE ${conditions.join(' AND ')}`
        const query = `SELECT * FROM ${this.tableName} ${conditions ? queryWhere : null}`;
        const [output] = await this.client.query(query, values);
        return new this.createInstance(output)
    }

    async save(data: Object<T>): Promise<string> {
        try {
            const [conditions, values] = this.getPropertiesAndValuesToQuery(data)
            let conditionsRemovedCaracters = conditions.map(e => `${e.replace(/=[^,]+/g, '')}`)
            let conditionsCreateCaracters = conditions.map((_: any, index: number) => `$${index + 1}`).join(", ")
            let query = `INSERT INTO ${this.tableName} (${conditionsRemovedCaracters}) VALUES (${conditionsCreateCaracters})`
            console.log(query, values)
            return await this.client.query(query, values)
        } catch (error: any) {
            throw new Error(error)
        }

    }
    async delete(params: Delete): Promise<void> {
        if (!params) throw new Error("Parameters not found")
        const [conditions, values] = this.getPropertiesAndValuesToQuery(params)
        let query = `DELETE FROM ${this.tableName} WHERE ${conditions}`
        await this.client.query(query, values)
    }
    async update(data: Object<T> & { id?: string }): Promise<void> {
        let id = data.id
        delete data.id
        const [conditions, values] = this.getPropertiesAndValuesToQuery(data)
        let query = `UPDATE ${this.tableName} SET ${conditions.join(", ")} WHERE id='${id}'`
        console.log(query)
        return await this.client.query(query, values)
    }
    async search(object: Partial<Omit<Object<T>, "id">> & PaginationSearchType): Promise<T[]> {
        let queryPage = ''
        if (object?.page) {
            queryPage = `LIMIT ${object.take} OFFSET (${object?.page - 1}) * ${object.take}`
        }
        const [conditions, values] = this.getPropertiesAndValuesToQuery(object)
        let conditionsRemovedCaracters = conditions.map((e, index) => `${e.replace(/=[^,]+/g, ` ILIKE $${index + 1}`)} `).join('OR ')
        let valuesAddCaracters = values.map((e, index) => `%${e}%`)
        let query = `SELECT * FROM ${this.tableName} WHERE ${conditionsRemovedCaracters} ${queryPage ?? null}`
        return await this.client.query(query, valuesAddCaracters)
    }

    async sqlCommand(query: string, values: any[]) {
        return await this.client.query(query, values)
    }
}

interface Constructor<T> {
    new(...args: any[]): T;
}