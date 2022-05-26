import { Validator } from "@utils";
import { DeleteListController } from "@controllers";
import { DeleteListServiceSpy } from "../../mocks/services/list/delete-spy";
import { ListRequestDto } from "@protocols";

type SutType = {
  sut: DeleteListController;
  validator: Validator
  deleteListServiceSpy: DeleteListServiceSpy
}

const mockRequest = (): ListRequestDto => ({ listId: '5b411588-9860-4d88-94bd-eb33f4ed6f55' });

const makeSut = (): SutType => {
  const validator = new Validator();
  const deleteListServiceSpy = new DeleteListServiceSpy();
  const sut = new DeleteListController(validator, deleteListServiceSpy);
  return {
    sut,
    validator,
    deleteListServiceSpy
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
    const { sut, deleteListServiceSpy } = makeSut();
    jest.spyOn(deleteListServiceSpy, 'delete').mockImplementation(() => { throw new Error() });
    const response = await sut.handle(mockRequest());
    expect(response.statusCode).toBe(500);
  })
})