import { v4 as UUID } from 'uuid';
import { IProps } from "./props";
import { ITask } from "./task";

export default class TaskModel {
  private _id: string;
  private _listId: string;
  private _description: string;
  private _completed: boolean;

  constructor({ id = UUID(), listId, description = '', completed = false }: IProps) {
    this._id = id;
    this._listId = listId;
    this._description = description;
    this._completed = completed;
  }

  setId(value: string) {
    this._id = value !== '' ? value : null;
  }

  getId() {
    return this._id;
  }

  setListId(value: string) {
    this._listId = value !== '' ? value : null;
  }

  getListId() {
    return this._listId;
  }

  setDescription(value: string) {
    this._description = value ? value : null;
  }

  getDescription() {
    return this._description;
  }

  setCompleted(value: boolean) {
    this._completed = value ? value : null;
  }

  getCompleted() {
    return this._completed;
  }

  getEntityMappings(): ITask {
    return {
      id: this.getId(),
      listId: this.getListId(),
      description: this.getDescription(),
      completed: this.getCompleted(),
      timestamp: new Date().getTime(),
    };
  }
}