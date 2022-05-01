export const deleteTaskConstraint = () => {
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
    }
  }
}