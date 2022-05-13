import { InvalidParamError } from "..";

export class AccountNotFoundError extends InvalidParamError {
  constructor (parameter: string) {
    super( parameter, 'error.userNotFound')
  }
}
