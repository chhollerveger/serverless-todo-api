import { Validator } from "@utils";
import { DeleteListController } from "@controllers";
import { ListServiceSpy } from "../../mocks/services/list-service-spy";
import { ListRequestDto } from "@protocols";

type SutType = {
  sut: DeleteListController;
  validator: Validator
  listServiceSpy: ListServiceSpy
}

const mockRequest = (): ListRequestDto => ({ listId: '5b411588-9860-4d88-94bd-eb33f4ed6f55' });

const makeSut = (): SutType => {
  const validator = new Validator();
  const listServiceSpy = new ListServiceSpy();
  const sut = new DeleteListController(validator, listServiceSpy);
  return {
    sut,
    validator,
    listServiceSpy
  };
}

describe('delete list controller', () => {

  test('should successfully delete a list with correct values', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(mockRequest());
    expect(response.statusCode).toBe(200);
  })

  test('should return a required field validation error', async () => {
    const { sut } = makeSut();
    const response = await sut.handle({});
    expect(response.statusCode).toBe(400);
  })

  test('should return an internal error', async () => {
    const { sut, listServiceSpy } = makeSut();
    jest.spyOn(listServiceSpy, 'delete').mockImplementation(() => { throw new Error() });
    const response = await sut.handle(mockRequest());
    expect(response.statusCode).toBe(500);
  })
})