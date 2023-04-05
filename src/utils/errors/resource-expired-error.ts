import { CustomError } from "../../core/conventions"

export class ResourceExpiredError extends CustomError {
  constructor (parameter: string, message = 'error.expired') {
    super( 'ResourceExpiredError', message, {  parameter })
  }
}
