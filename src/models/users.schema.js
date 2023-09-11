import { body } from 'express-validator'

export const createUserSchema = [
  body('username')
    .exists()
    .notEmpty().withMessage("The username must not be empty.")
    .isString().withMessage("The username must be a string."),
  body('password')
    .exists()
    .notEmpty().withMessage("The password must not be empty")
    .isString(),
  body('email')
    .exists()
    .notEmpty().withMessage("The email must not be empty")
    .isEmail().withMessage("That is not a valid email")
]

export const loginUserSchema = [
  body('email')
    .exists()
    .notEmpty()
    .isEmail(),
  body('password')
    .exists()
    .notEmpty()
    .isString()
]
