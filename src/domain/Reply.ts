import { v4 } from "uuid"

type IReply = {
  id: string
  comment: string
  questionId: string
}

export class Reply {
  id: string
  comment: string
  questionId: string
  constructor(params: IReply) {
    this.id = params.id
    this.comment = params.comment
    this.questionId = params.questionId
  }
  static Create(params: Omit<IReply, "id">) {
    return new Reply({ ...params, id: v4() })
  }

  get(key?: keyof IReply) {
    if (key) return this[key as keyof IReply]
    return {
      id: this.id,
      comment: this.comment,
      questionId: this.questionId
    }
  }
}