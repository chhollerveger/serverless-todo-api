export const updateTaskConstraint = () => {
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
        },
        "description": {
            "type": "string"
        },
        "completed": {
            "type": "boolean"
        }
    };
};
//# sourceMappingURL=update.js.map