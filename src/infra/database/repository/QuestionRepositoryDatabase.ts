import { QuestionRepository } from "../../../application/repository/interface/QuestionRepository";
import { Questions } from "../../../domain/Questions";
import { Reply } from "../../../domain/Reply";
import { BaseRepositoryDatabase } from "./default/BaseRepositoryDatabase";

export class QuestionRepositoryDatabase extends BaseRepositoryDatabase<Questions> implements QuestionRepository {
  constructor(private pg: any) {
    super(Questions, pg)
  }
  async findManyAndClassrooms(): Promise<any> {
    const ouput = await this.sqlCommand(`
    SELECT 
      "questions".*,
      "reply"."id" as "reply_id",
      "reply"."comment" as "reply_comment"
    FROM "questions"
    JOIN "reply" on "questions"."id" = "reply"."questionId"`, [])
    let reply: Reply[] = []
    for (let index = 0; index < ouput.length; index++) {
      const element = ouput[index];
      reply.push(new Reply({
        comment: element["reply_id"],
        id: element["reply_id"],
        questionId: element["id"]
      }))
    }
    let questions = new Questions({
      id: ouput[0]["id"],
      question: ouput[0]["question"],
      classroomId: ouput[0]["classroomId"]
    })
    questions.addReply(reply)
    return questions
  }
}