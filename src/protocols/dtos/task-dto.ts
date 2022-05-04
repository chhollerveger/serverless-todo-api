import { ListDto } from "./list-dto";

export class TaskDto extends ListDto {
  public taskId: string;
  public description: string;
  public completed: string;
}
