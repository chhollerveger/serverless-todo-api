import { v4 as uuid } from 'uuid';

export class ListModel {
  private readonly _id: string;
  private readonly _timestamp: number;

  constructor(private _name: string) {
    this._id = uuid();
    this._timestamp = new Date().getTime();
    Object.freeze(this);
  }

  get id(): string {
    return this._id;
  }

  set name(name: string) {
    this._name = name !== '' ? name : null;
  }

  get name(): string {
    return this._name;
  }

  get timestamp(): number {
    return this._timestamp;
  }
}