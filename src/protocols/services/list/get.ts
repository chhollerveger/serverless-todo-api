import { ITodoDto, ListRequestDto } from "@protocols";

export interface IGetListService {
  get(request: ListRequestDto): Promise<ITodoDto>;
}