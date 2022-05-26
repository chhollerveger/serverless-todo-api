import { Validator } from "@utils";
import { CreateTaskController } from "@controllers";
import { TaskServiceSpy } from "../../mocks/services/task-service-spy";

type SutType = {
  sut: CreateTaskController;
  validator: Validator;
  taskServiceSpy: TaskServiceSpy;
}

const mockRequest = (): string => JSON.stringify({
	listId: "61470607-e7c4-486a-9334-fc2af1f4c1e5",
	description: "my new to-do list"
});

const makeSut = (): SutType => {
  const validator = new Validator();
  const taskServiceSpy = new TaskServiceSpy();
  const sut = new CreateTaskController(validator, taskServiceSpy);
  return {
    sut,
    validator,
    taskServiceSpy
  };
}

describe('create task controller', () => {

  test('should successfully create a task with correct values', async () => {
    const { sut, taskServiceSpy } = makeSut();
    const response = await sut.handle(mockRequest());
    const { data } = JSON.parse(response.body);
    expect(response.statusCode).toBe(201);
    expect(data).toEqual(taskServiceSpy.created);
  })

  test('should return a required field validation error', async () => {
    const { sut } = makeSut();
    const response = await sut.handle('{}');
    expect(response.statusCode).toBe(400);
  })

  test('should return an internal error', async () => {
    const { sut, taskServiceSpy } = makeSut();
    jest.spyOn(taskServiceSpy, 'create').mockImplementation(() => { throw new Error() });
    const response = await sut.handle(mockRequest());
    expect(response.statusCode).toBe(500);
  })
})