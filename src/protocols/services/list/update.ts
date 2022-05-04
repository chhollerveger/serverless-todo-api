import { ListRequestDto } from "@protocols";

export interface IUpdateListService {
  update(request: ListRequestDto): Promise<void>;
}