import { validate } from 'validate.js/validate';
import { IGenericType, IValidator } from '@protocols';
import { BadRequestError } from '@presentation';

export class Validator implements IValidator {

  public validateAgainstConstraints<T>(values: T, constraints: IGenericType<object>): void | BadRequestError {
    const validation = validate(values, constraints);
    if (typeof validation !== 'undefined') {
      return new BadRequestError('required fields are missing', { validation })
    }
  }
}