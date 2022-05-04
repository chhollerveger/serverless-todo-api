export const deleteTaskConstraint = () => {
  return {
    "taskId": {
      "presence": {
        "allowEmpty": false
      },
      "type": "string"
    },
    "listId": {
      "presence": {
        "allowEmpty": false
      },
      "type": "string"
    }
  }
}