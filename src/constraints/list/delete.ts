export const deleteListConstraint = () => {
  return {
    "listId": {
      "presença": {
        "allowEmpty": false
      },
      "type": "string"
    }
  };
}