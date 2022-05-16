import { Validator } from "@utils";
import { CreateListController } from "@controllers";
import { CreateListServiceSpy } from "./mocks/services/list/create-spy";

type SutType = {
  sut: CreateListController;
  validator: Validator
  createListServiceSpy: CreateListServiceSpy
}

const mockRequest = (): string => JSON.stringify({ name: 'test' });

const makeSut = (): SutType => {
  const validator = new Validator();
  const createListServiceSpy = new CreateListServiceSpy();
  const sut = new CreateListController(validator, createListServiceSpy);
  return {
    sut,
    validator,
    createListServiceSpy
  };
}

describe('create list controller', () => {

  test('should successfully create a list with correct values', async () => {
    const { sut, createListServiceSpy } = makeSut();
    const response = await sut.handle(mockRequest());
    const { data } = JSON.parse(response.body);
    expect(response.statusCode).toBe(201);
    expect(data).toEqual(createListServiceSpy.data);
  })

  test('should return a required field validation error', async () => {
    const { sut } = makeSut();
    const response = await sut.handle('{}');
    expect(response.statusCode).toBe(400);
  })

  test('should return an internal error', async () => {
    const { sut, createListServiceSpy } = makeSut();
    jest.spyOn(createListServiceSpy, 'create').mockImplementation(() => { throw new Error() });
    const response = await sut.handle(mockRequest());
    expect(response.statusCode).toBe(500);
  })
})