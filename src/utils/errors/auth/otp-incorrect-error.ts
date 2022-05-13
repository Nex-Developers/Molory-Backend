import { InvalidParamError } from "..";

export class OtpIncorrectError extends InvalidParamError {
  constructor (parameter: string) {
    super( parameter, 'error.otpIncorrect')
  }
}
