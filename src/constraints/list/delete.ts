export const deleteListConstraint = () => {
  return {
    "listId": {
      "presence": {
        "allowEmpty": false
      },
      "type": "string"
    }
  }
}