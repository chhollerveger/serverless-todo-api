export const createListConstraint = () => {
  return {
    "name": {
      "presence": {
        "allowEmpty": false
      },
      "type": "string"
    }
  }
}