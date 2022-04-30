import { v4 as UUID } from 'uuid';
import { IList } from "./list";
import { IProps } from './props';

export class ListModel {

  private _id: string;
  private _name: string;

  constructor({ id = UUID(), name = '' }: IProps) {
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

  getEntityMappings(): IList {
    return {
      id: this.getId(),
      name: this.getName(),
      timestamp: new Date().getTime(),
    };
  }
}