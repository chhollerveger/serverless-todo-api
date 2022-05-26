import { Validator } from "@utils";
import { UpdateTaskController } from "@controllers";
import { TaskServiceSpy } from "../../mocks/services/task-service-spy";
import { TaskRequestDto } from "@protocols";

type SutType = {
  sut: UpdateTaskController;
  validator: Validator;
  taskServiceSpy: TaskServiceSpy;
}

type ListRequest = {
  body: TaskRequestDto;
  params: TaskRequestDto;
}

const mockBody = (): TaskRequestDto => ({
  listId: '61470607-e7c4-486a-9334-fc2af1f4c1e5',
  description: 'my task updated',
  completed: true
})

const mockParams = (): TaskRequestDto => ({
  taskId: '0f87c7d0-82c6-4d98-9b3a-ea1bca666afa'
})

const mockRequest = (): ListRequest => {
  const body = mockBody();
  const params = mockParams();
  return { body, params };
}

const makeSut = (): SutType => {
  const validator = new Validator();
  const taskServiceSpy = new TaskServiceSpy();
  const sut = new UpdateTaskController(validator, taskServiceSpy);
  return {
    sut,
    validator,
    taskServiceSpy
  };
}


describe('update task controller', () => {

  test('should successfully update a task with correct values', async () => {
    const { sut, taskServiceSpy } = makeSut();
    const { body, params } = mockRequest();
    const response = await sut.handle(JSON.stringify(body), params);
    expect(response.statusCode).toBe(200);
    expect(body.completed).toEqual(taskServiceSpy.data.completed);
    expect(body.description).toEqual(taskServiceSpy.data.description);
  })

  test('should return a required field validation error', async () => {
    const { sut } = makeSut();
    const { params } = mockRequest();
    const response = await sut.handle('{}', params);
    expect(response.statusCode).toBe(400);
  })

  test('should return invalid request at least one of them must be present', async () => {
    const { sut } = makeSut();
    const { body, params } = mockRequest();
    body.completed = undefined;
    body.description = undefined;
    const response = await sut.handle(JSON.stringify(body), params);
    expect(response.statusCode).toBe(400);
  })

  test('should return an internal error', async () => {
    const { sut, taskServiceSpy } = makeSut();
    jest.spyOn(taskServiceSpy, 'update').mockImplementation(() => { throw new Error() });
    const { body, params } = mockRequest();
    const response = await sut.handle(JSON.stringify(body), params);
    expect(response.statusCode).toBe(500);
  })
})