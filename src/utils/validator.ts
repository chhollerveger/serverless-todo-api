import { validate } from 'validate.js/validate';
import { ResponseModel } from '@/models';
import { IGenericType, IValidator } from '@/protocols';

export class Validator implements IValidator {

  public validateAgainstConstraints(values: IGenericType<string>, constraints: IGenericType<object>): void {
    const validation = validate(values, constraints);
    if (typeof validation !== 'undefined') {
      throw new ResponseModel({ validation }, 400, 'required fields are missing');
    }
  }
}