import { v4 as uuidv4 } from 'uuid';
import { Classrooms } from './Classrooms';
export type IModules = {
  id: string;
  name: string;
  description: string;
  teacherId: string,
}
export class Modules {
  id: string;
  name: string;
  description: string;
  teacherId: string;
  classRooms?: Classrooms[]

  constructor(params: IModules) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.teacherId = params.teacherId
  }
  static Create(params: Omit<IModules, "id" | "classRooms">): Modules {
    return new Modules({ ...params, id: uuidv4() });
  }

  add(classRooms: Classrooms[]) {
    this.classRooms = classRooms
  }
  get(key?: keyof IModules) {
    if (key) return this[key as keyof IModules]
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      teacherId: this.teacherId,
      classRooms: this.classRooms
    }
  }
  update(properties: Omit<Partial<IModules>, "id">) {
    Object.assign(this, properties);
  }
}