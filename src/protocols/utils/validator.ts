import { BadRequestError } from "@presentation";
import { IGenericType } from "./generic-type";

export interface IValidator {
  validateAgainstConstraints<T>(values: T, constraints: IGenericType<object>): void | BadRequestError;
}