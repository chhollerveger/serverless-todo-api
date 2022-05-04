import { ListRequestDto } from "@protocols";

export interface IDeleteListService {
  delete(request: ListRequestDto): Promise<void>;
}