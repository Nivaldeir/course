import { v4 as uuidv4 } from 'uuid';
export type IClassrooms = {
  id: string;
  name: string;
  description: string;
  url: string;
  moduleId: string
}
export class Classrooms {
  id: string;
  name: string;
  description: string;
  url: string;
  moduleId: string

  constructor(params: IClassrooms) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.url = params.url
    this.moduleId = params.moduleId

  }
  static Create(params: Omit<IClassrooms, "id">): Classrooms {
    return new Classrooms({ ...params, id: uuidv4() });
  }
  get(key?: keyof IClassrooms) {
    if (key) return this[key as keyof IClassrooms]
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      moduleId: this.moduleId
    }
  }
  update(properties: Omit<Partial<IClassrooms>, "id">) {
    Object.assign(this, properties);
  }
}