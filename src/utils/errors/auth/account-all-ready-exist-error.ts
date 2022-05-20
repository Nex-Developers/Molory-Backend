import { InvalidParamError } from "..";

export class AccountAllReadyExistError extends InvalidParamError {
  constructor (parameter: string) {
    super( parameter, 'error.userAlreadyExists')
  }
}
