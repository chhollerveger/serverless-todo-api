import { Validator } from "@utils";
import { UpdateListController } from "@controllers";
import { UpdateListServiceSpy } from "../../mocks/services/list/update-spy";
import { ListRequestDto } from "@protocols";

type SutType = {
  sut: UpdateListController;
  validator: Validator;
  updateListServiceSpy: UpdateListServiceSpy;
}

type ListRequest = {
  body: { name: string };
  params: ListRequestDto;
}

const mockRequest = (): ListRequest => {
  const body = { name: 'my todo list updated' };
  const params = { listId: '61470607-e7c4-486a-9334-fc2af1f4c1e5' };
  return { body, params };
}

const makeSut = (): SutType => {
  const validator = new Validator();
  const updateListServiceSpy = new UpdateListServiceSpy();
  const sut = new UpdateListController(validator, updateListServiceSpy);
  return {
    sut,
    validator,
    updateListServiceSpy
  };
}


describe('update list controller', () => {

  test('should successfully update a list with correct values', async () => {
    const { sut, updateListServiceSpy } = makeSut();
    const { body, params } = mockRequest();
    const response = await sut.handle(JSON.stringify(body), params);
    expect(response.statusCode).toBe(200);
    expect(body.name).toEqual(updateListServiceSpy.data.name);
  })

  test('should return a required field validation error', async () => {
    const { sut } = makeSut();
    const { params } = mockRequest();
    const response = await sut.handle('{}', params);
    expect(response.statusCode).toBe(400);
  })

  test('should return an internal error', async () => {
    const { sut, updateListServiceSpy } = makeSut();
    jest.spyOn(updateListServiceSpy, 'update').mockImplementation(() => { throw new Error() });
    const { body, params } = mockRequest();
    const response = await sut.handle(JSON.stringify(body), params);
    expect(response.statusCode).toBe(500);
  })
})