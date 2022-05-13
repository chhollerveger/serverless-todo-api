import { ICreateListService, ListRequestDto } from "@protocols";

export class CreateListServiceSpy implements ICreateListService {
  id = '5b411588-9860-4d88-94bd-eb33f4ed6f55'
  request: ListRequestDto;
  data: {};

  async create(request: ListRequestDto): Promise<string> {
    this.request = request;
    this.data = { listId: this.id };
    return this.id
  }
}