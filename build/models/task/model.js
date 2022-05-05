import { v4 as uuid } from 'uuid';
export class TaskModel {
    constructor(_listId, _description, _completed) {
        this._listId = _listId;
        this._description = _description;
        this._completed = _completed;
        this._id = uuid();
        this._timestamp = new Date().getTime();
        Object.freeze(this);
    }
    get id() {
        return this._id;
    }
    get listId() {
        return this._listId;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description ? description : null;
    }
    get completed() {
        return this._completed;
    }
    set completed(completed) {
        this._completed = completed ? completed : null;
    }
    get timestamp() {
        return this._timestamp;
    }
    get createdAt() {
        return this._timestamp;
    }
    get updatedAt() {
        return this._timestamp;
    }
}
//# sourceMappingURL=model.js.map