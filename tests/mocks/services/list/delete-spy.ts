import { IDeleteListService, ListRequestDto } from "@protocols";

export class DeleteListServiceSpy implements IDeleteListService {
  id: string = null

  async delete(params: ListRequestDto): Promise<void> {
    this.id = params.listId;
  }
}