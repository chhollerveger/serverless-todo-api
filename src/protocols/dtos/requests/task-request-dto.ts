import { ListRequestDto } from "./list-request-dto";

export class TaskRequestDto extends ListRequestDto {
  public taskId?: string;
  public description?: string;
  public completed?: boolean;
}
