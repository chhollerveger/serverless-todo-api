import { IGetListService, IListResponseDto, ListRequestDto } from "@protocols";
import { mockListData } from "../../../mocks/data/list-data";

export class GetListServiceSpy implements IGetListService {
  data: IListResponseDto = mockListData();

  async get(params: ListRequestDto): Promise<IListResponseDto> {
    if (params.listId !== this.data.id) {
      return null;
    }
    return this.data;
  }
}