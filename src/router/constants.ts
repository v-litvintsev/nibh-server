import { check } from 'express-validator'

export enum EPaths {
  login = '/login',
  registration = '/registration',
  getUser = '/get-user',
  home = '/home',
  chat = '/chat',
  users = '/users',
}

export const loginValidationRules = [
  check('username', 'Incorrect username').isLength({ min: 1, max: 32 }),
  check('password', 'Incorrect password').isLength({ min: 8, max: 32 }),
]
