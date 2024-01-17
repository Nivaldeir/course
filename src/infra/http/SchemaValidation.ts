import { body } from "express-validator";

export const schemaValidationCourseCreate = [
  body('name').notEmpty().withMessage("name required"),
  body('description').notEmpty().withMessage("description required"),
  body('url').notEmpty().withMessage("url required"),
]

export const schemaValidationModuleCreate = [
  body('name').notEmpty().withMessage("name required"),
  body('description').notEmpty().withMessage("description required"),
]

export const schemaValidationQuestinCreate = [
  body('question').notEmpty().withMessage("question required"),
]
export const schemaValidationReplyCreate = [
  body('comment').notEmpty().withMessage("comment required"),
  body('questionId').notEmpty().withMessage("questionId required"),
]