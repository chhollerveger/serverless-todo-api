import { IGenericType } from "./generic-type";

export interface IValidator {
  validateAgainstConstraints(values: IGenericType<string>, constraints: IGenericType<object>): void;
}