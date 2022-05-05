import { v4 as uuid } from 'uuid';
export class ListModel {
    constructor(_name) {
        this._name = _name;
        this._id = uuid();
        this._timestamp = new Date().getTime();
        Object.freeze(this);
    }
    get id() {
        return this._id;
    }
    set name(name) {
        this._name = name !== '' ? name : null;
    }
    get name() {
        return this._name;
    }
    get timestamp() {
        return this._timestamp;
    }
}
//# sourceMappingURL=model.js.map