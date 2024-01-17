import { v4 } from "uuid"
import { Reply } from "./Reply"

type IQuestions = {
  id: string
  question: string
  classroomId: string
}

export class Questions {
  id: string
  question: string
  classroomId: string
  private reply?: Reply[]

  constructor(params: IQuestions) {
    this.id = params.id
    this.question = params.question
    this.classroomId = params.classroomId
  }
  static Create(params: Omit<IQuestions, "id" | "reply">) {
    return new Questions({ ...params, id: v4() })
  }
  addReply(reply: Reply[]) {
    this.reply = reply
  }
  get(key?: keyof IQuestions) {
    if (key) return this[key as keyof IQuestions]
    return {
      id: this.id,
      question: this.question,
      reply: this.reply
    }
  }
}