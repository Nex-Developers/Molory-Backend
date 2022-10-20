import { CustomError } from "../../core/conventions"

export class InvalidParamError extends CustomError {
  constructor (parameter: string, message = 'error.invalid') {
    super( 'InvalidParamError', message, {  parameter })
  }
}
