import { IListResponseDto, IUpdateListService, ListRequestDto } from "@protocols";
import { mockListData } from "../../../mocks/data/list-data";

export class UpdateListServiceSpy implements IUpdateListService {
  data: IListResponseDto = mockListData();

  async update(params: ListRequestDto): Promise<void> {
    if (params.listId === this.data.id) {
      this.data.name = params.name;
    }
  }
}