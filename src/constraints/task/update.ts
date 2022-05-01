export const updateTaskConstraint = () => {
  return {
    "listId": {
      "presence": {
        "allowEmpty": false
      },
      "type": "string"
    },
    "taskId": {
      "presence": {
        "allowEmpty": false
      },
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "completed": {
      "type": "boolean"
    }
  }
}