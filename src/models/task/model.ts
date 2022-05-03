import { v4 as uuid } from 'uuid';

export class TaskModel {
  private readonly _id: string;

  constructor(
    private readonly _listId: string,
    private _description: string,
    private _completed: boolean
  ) {
    this._id = uuid();
    Object.freeze(this);
  }

  get id(): string {
    return this._id;
  }

  get listId(): string {
    return this._listId;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description ? description : null;
  }

  get completed(): boolean {
    return this._completed;
  }

  set completed(completed: boolean) {
    this._completed = completed ? completed : null;
  }
}