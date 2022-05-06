export const updateListConstraint = () => {
  return {
    "listId": {
      "presence": {
        "allowEmpty": false
      },
      "type": "string"
    },
    "name": {
      "presence": {
        "allowEmpty": false
      },
      "type": "string"
    }
  };
}