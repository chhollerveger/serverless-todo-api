import { ListRequestDto } from "@protocols";

export interface ICreateListService {
  create(request: ListRequestDto): Promise<string>;
}