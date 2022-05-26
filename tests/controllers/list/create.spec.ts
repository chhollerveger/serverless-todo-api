import { Validator } from "@utils";
import { CreateListController } from "@controllers";
import { ListServiceSpy } from "../../mocks/services/list-service-spy";

type SutType = {
  sut: CreateListController;
  validator: Validator
  listServiceSpy: ListServiceSpy
}

const mockRequest = (): string => JSON.stringify({ name: 'test' });

const makeSut = (): SutType => {
  const validator = new Validator();
  const listServiceSpy = new ListServiceSpy();
  const sut = new CreateListController(validator, listServiceSpy);
  return {
    sut,
    validator,
    listServiceSpy
  };
}

describe('create list controller', () => {

  test('should successfully create a list with correct values', async () => {
    const { sut, listServiceSpy } = makeSut();
    const response = await sut.handle(mockRequest());
    const { data } = JSON.parse(response.body);
    expect(response.statusCode).toBe(201);
    expect(data).toEqual(listServiceSpy.created);
  })

  test('should return a required field validation error', async () => {
    const { sut } = makeSut();
    const response = await sut.handle('{}');
    expect(response.statusCode).toBe(400);
  })

  test('should return an internal error', async () => {
    const { sut, listServiceSpy } = makeSut();
    jest.spyOn(listServiceSpy, 'create').mockImplementation(() => { throw new Error() });
    const response = await sut.handle(mockRequest());
    expect(response.statusCode).toBe(500);
  })
})