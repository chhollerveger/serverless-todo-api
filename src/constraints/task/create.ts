export const createTaskConstraint = () => {
  return {
    "listId": {
      "presença": {
        "allowEmpty": false
      },
      "type": "string"
    },
    "description": {
      "presença": {
        "allowEmpty": false
      },
      "type": "string"
    }
  }
}