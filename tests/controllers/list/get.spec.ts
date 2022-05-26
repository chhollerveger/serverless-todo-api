import { Validator } from "@utils";
import { GetListController } from "@controllers";
import { ListServiceSpy } from "../../mocks/services/list-service-spy";
import { ListRequestDto } from "@protocols";

type SutType = {
  sut: GetListController;
  validator: Validator
  listServiceSpy: ListServiceSpy
}

const mockRequest = (): ListRequestDto => ({ listId: '61470607-e7c4-486a-9334-fc2af1f4c1e5' });

const makeSut = (): SutType => {
  const validator = new Validator();
  const listServiceSpy = new ListServiceSpy();
  const sut = new GetListController(validator, listServiceSpy);
  return {
    sut,
    validator,
    listServiceSpy
  };
}

describe('get list controller', () => {

  test('should successfully get a list with correct values', async () => {
    const { sut, listServiceSpy } = makeSut();
    const response = await sut.handle(mockRequest());
    const { data } = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(data).toEqual(listServiceSpy.data);
  })

  test('should return a required field validation error', async () => {
    const { sut } = makeSut();
    const response = await sut.handle({});
    expect(response.statusCode).toBe(400);
  })

  test('should return an internal error', async () => {
    const { sut, listServiceSpy } = makeSut();
    jest.spyOn(listServiceSpy, 'get').mockImplementation(() => { throw new Error() });
    const response = await sut.handle(mockRequest());
    expect(response.statusCode).toBe(500);
  })
})