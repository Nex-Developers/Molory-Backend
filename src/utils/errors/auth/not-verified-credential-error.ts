import { CustomError } from "../../../core/conventions"

export class NotVerifiedCredentialError extends CustomError {
  constructor () {
    super( 'NotVerifiedCredentialError', 'error.notVerifiedCredential')
  }
}
