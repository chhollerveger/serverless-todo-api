import { Validator } from "@utils";
import { GetTaskController } from "@controllers";
import { TaskServiceSpy } from "../../mocks/services/task-service-spy";
import { TaskRequestDto } from "@protocols";

type SutType = {
  sut: GetTaskController;
  validator: Validator
  taskServiceSpy: TaskServiceSpy
}

const mockRequest = (): TaskRequestDto => ({
  taskId: '0f87c7d0-82c6-4d98-9b3a-ea1bca666afa',
  listId: '61470607-e7c4-486a-9334-fc2af1f4c1e5'
});

const makeSut = (): SutType => {
  const validator = new Validator();
  const taskServiceSpy = new TaskServiceSpy();
  const sut = new GetTaskController(validator, taskServiceSpy);
  return {
    sut,
    validator,
    taskServiceSpy
  };
}

describe('get task controller', () => {

  test('should successfully get a task with correct values', async () => {
    const { sut, taskServiceSpy } = makeSut();
    const response = await sut.handle(mockRequest());
    const { data } = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(data).toEqual(taskServiceSpy.data);
  })

  test('should return a required field validation error', async () => {
    const { sut } = makeSut();
    const response = await sut.handle({});
    expect(response.statusCode).toBe(400);
  })

  test('should return an internal error', async () => {
    const { sut, taskServiceSpy } = makeSut();
    jest.spyOn(taskServiceSpy, 'get').mockImplementation(() => { throw new Error() });
    const response = await sut.handle(mockRequest());
    expect(response.statusCode).toBe(500);
  })
})