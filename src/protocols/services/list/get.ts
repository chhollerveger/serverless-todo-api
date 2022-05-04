import { ITodoDto, ListDto } from "@protocols";

export interface IGetListService {
  get(request: ListDto): Promise<ITodoDto>;
}