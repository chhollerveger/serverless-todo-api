import { BadRequestError } from "@presentation";

export function converterToType<T>(body: any, type: new () => T, params: any = undefined): T {
  try {
    const taregt = new type();
    const parsedData = JSON.parse(body);
    Object.assign(taregt, parsedData, params);
    Object.keys(taregt).forEach((key) => taregt[key] === undefined && delete taregt[key]);
    return taregt;
  } catch (error) {
    throw new BadRequestError(error.message);
  }
}