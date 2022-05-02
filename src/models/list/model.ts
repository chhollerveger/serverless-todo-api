import { v4 as UUID } from 'uuid';
import { IListModel } from "./list-model";

export class ListModel {

  private _id: string;
  private _name: string;

  constructor({ id = UUID(), name = '' }: IListModel) {
    this._id = id;
    this._name = name;
  }

  setId(value: string) {
    this._id = value !== '' ? value : null;
  }

  getId() {
    return this._id;
  }

  setName(value: string) {
    this._name = value !== '' ? value : null;
  }

  getName() {
    return this._name;
  }

  getEntityMappings(): IListModel {
    return {
      id: this.getId(),
      name: this.getName(),
      timestamp: new Date().getTime(),
    };
  }
}