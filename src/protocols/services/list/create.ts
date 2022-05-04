import { ListDto } from "@protocols";

export interface ICreateListService {
  create(request: ListDto): Promise<string>;
}