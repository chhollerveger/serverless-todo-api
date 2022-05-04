import { IListResponseDto, ListRequestDto } from "@protocols";

export interface IGetListService {
  get(request: ListRequestDto): Promise<IListResponseDto>;
}