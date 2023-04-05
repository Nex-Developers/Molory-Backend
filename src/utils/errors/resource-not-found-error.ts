import { CustomError } from "../../core/conventions"

export class ResourceNotFoundError extends CustomError {
  constructor (parameter: string, message = 'error.notFound') {
    super( 'ResourceNotFoundError', message, {  parameter })
  }
}
