export interface ICreateTaskService {
  create(request: any): Promise<string>;
}