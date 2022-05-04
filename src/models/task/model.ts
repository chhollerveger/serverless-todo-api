import { v4 as uuid } from 'uuid';

export class TaskModel {
  private readonly _id: string;
  private readonly _timestamp: number;

  constructor(
    private readonly _listId: string,
    private _description: string,
    private _completed: boolean
  ) {
    this._id = uuid();
    this._timestamp = new Date().getTime();
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

  get timestamp(): number {
    return this._timestamp;
  }

  get createdAt(): number {
    return this._timestamp;
  }

  get updatedAt(): number {
    return this._timestamp;
  }
}