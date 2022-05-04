import { ListDto } from "@protocols";

export interface IDeleteListService {
  delete(request: ListDto): Promise<void>;
}