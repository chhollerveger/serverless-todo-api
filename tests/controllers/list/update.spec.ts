import { Validator } from "@utils";
import { UpdateListController } from "@controllers";
import { ListServiceSpy } from "../../mocks/services/list-service-spy";
import { ListRequestDto } from "@protocols";

type SutType = {
  sut: UpdateListController;
  validator: Validator;
  listServiceSpy: ListServiceSpy;
}

type ListRequest = {
  body: ListRequestDto;
  params: ListRequestDto;
}

const mockBody = (): ListRequestDto => ({
  name: 'my todo list updated'
})

const mockParams = (): ListRequestDto => ({
  listId: '61470607-e7c4-486a-9334-fc2af1f4c1e5'
})

const mockRequest = (): ListRequest => {
  const body = mockBody();
  const params = mockParams();
  return { body, params };
}

const makeSut = (): SutType => {
  const validator = new Validator();
  const listServiceSpy = new ListServiceSpy();
  const sut = new UpdateListController(validator, listServiceSpy);
  return {
    sut,
    validator,
    listServiceSpy
  };
}


describe('update list controller', () => {

  test('should successfully update a list with correct values', async () => {
    const { sut, listServiceSpy } = makeSut();
    const { body, params } = mockRequest();
    const response = await sut.handle(JSON.stringify(body), params);
    expect(response.statusCode).toBe(200);
    expect(body.name).toEqual(listServiceSpy.data.name);
  })

  test('should return a required field validation error', async () => {
    const { sut } = makeSut();
    const { params } = mockRequest();
    const response = await sut.handle('{}', params);
    expect(response.statusCode).toBe(400);
  })

  test('should return an internal error', async () => {
    const { sut, listServiceSpy } = makeSut();
    jest.spyOn(listServiceSpy, 'update').mockImplementation(() => { throw new Error() });
    const { body, params } = mockRequest();
    const response = await sut.handle(JSON.stringify(body), params);
    expect(response.statusCode).toBe(500);
  })
})