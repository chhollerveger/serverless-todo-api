export const getTaskConstraint = () => {
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
    };
};
//# sourceMappingURL=get.js.map