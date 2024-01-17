export interface BaseRepository<T> {
  get(params: Partial<Object<T>>): Promise<T>
  show(params?: AttributesToArrayOptional<T> & PaginationSearchType): Promise<T[]>
  save(data: Object<T>): Promise<string>
  delete(params: Delete): Promise<void>
  update(data: Object<T>): Promise<void>
  search(object: SeachType<T> & PaginationSearchType): Promise<T[]>
}

export type Delete = {
  [key: string]: string
}
export type GetAttributes<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? never : T[K];
}

export type Object<T> = Omit<GetAttributes<T>, "get" | "update" | "add" | "addReply">

export type SeachType<T> = Partial<Omit<Object<T>, "id">>

export type PaginationSearchType = {
  take?: number,
  page?: number
}
export type Attributes<T> = Omit<{
  [K in keyof T]: T[K][]
}, "get" | "update" | "add" | "addReply">

export type AttributesToArrayOptional<T> = Partial<Attributes<T>> 
