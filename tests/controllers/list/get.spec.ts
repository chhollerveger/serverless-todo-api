import { Validator } from "@utils";
import { GetListController } from "@controllers";
import { GetListServiceSpy } from "../../mocks/services/list/get-spy";
import { ListRequestDto } from "@protocols";

type SutType = {
  sut: GetListController;
  validator: Validator
  getListServiceSpy: GetListServiceSpy
}

const mockRequest = (): ListRequestDto => ({ listId: '61470607-e7c4-486a-9334-fc2af1f4c1e5' });

const makeSut = (): SutType => {
  const validator = new Validator();
  const getListServiceSpy = new GetListServiceSpy();
  const sut = new GetListController(validator, getListServiceSpy);
  return {
    sut,
    validator,
    getListServiceSpy
  };
}

describe('get list controller', () => {

  test('should successfully get a list with correct values', async () => {
    const { sut, getListServiceSpy } = makeSut();
    const response = await sut.handle(mockRequest());
    const { data } = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(data).toEqual(getListServiceSpy.data);
  })

  test('should return a required field validation error', async () => {
    const { sut } = makeSut();
    const response = await sut.handle({});
    expect(response.statusCode).toBe(400);
  })

  test('should return an internal error', async () => {
    const { sut, getListServiceSpy } = makeSut();
    jest.spyOn(getListServiceSpy, 'get').mockImplementation(() => { throw new Error() });
    const response = await sut.handle(mockRequest());
    expect(response.statusCode).toBe(500);
  })
})