import { InvalidParamError } from "..";

export class UnmatchedAuthMethodError extends InvalidParamError {
  constructor (parameter: string) {
    super( parameter, 'error.unmatchedAuthMethod')
  }
}
