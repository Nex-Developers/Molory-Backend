import { CustomError } from "../../../core/conventions";

export class AccountNotFoundError extends CustomError {
  constructor (parameter: string) {
    super('AccountNotFoundError', 'error.userNotFound', parameter)
  }
}
