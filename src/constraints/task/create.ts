export const createTaskConstraint = () => {
  return {
    "listId": {
      "presence": {
        "allowEmpty": false
      },
      "type": "string"
    },
    "description": {
      "presence": {
        "allowEmpty": false
      },
      "type": "string"
    }
  }
}