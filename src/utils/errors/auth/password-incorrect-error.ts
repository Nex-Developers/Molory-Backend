import { InvalidParamError } from "..";

export class PasswordIncorrectError extends InvalidParamError {
  constructor (parameter: string) {
    super( parameter, 'error.passwordIncorrect')
  }
}
