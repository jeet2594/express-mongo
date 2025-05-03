import { body } from "express-validator";

export const loginValidation = [
    body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .bail()
    .isEmail().withMessage("Email is invalid"),
    body("password")
    .trim()
    .notEmpty().withMessage("Password is required"),
];

export const registerValidation = [
  ...loginValidation,
  body("name").trim().notEmpty().withMessage("name is required"),
];
