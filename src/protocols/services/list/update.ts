import { ListDto } from "@protocols";

export interface IUpdateListService {
  update(request: ListDto): Promise<any>;
}