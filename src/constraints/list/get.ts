export const getListConstraint = () => {
  return {
    "listId": {
      "presence": {
        "allowEmpty": false
      },
      "type": "string"
    }
  }
}