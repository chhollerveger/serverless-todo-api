import { ICreateListService, IDeleteListService, IGetListService, IListResponseDto, IUpdateListService, ListRequestDto } from "@protocols";
import { mockListData } from "../data/list-data";

export class ListServiceSpy implements ICreateListService, IDeleteListService, IGetListService, IUpdateListService {
  data: IListResponseDto = mockListData();
  created: {};

  async create(request: ListRequestDto): Promise<string> {
    this.data.name = request.name;
    this.created = { listId: this.data.id };
    return this.data.id;
  }

  async delete(params: ListRequestDto): Promise<void> {
    this.data.id = params.listId;
  }

  async get(params: ListRequestDto): Promise<IListResponseDto> {
    if (params.listId !== this.data.id) {
      return null;
    }
    return this.data;
  }

  async update(params: ListRequestDto): Promise<void> {
    if (params.listId === this.data.id) {
      this.data.name = params.name;
    }
  }
}