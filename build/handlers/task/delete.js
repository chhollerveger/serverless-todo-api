import { makeDeleteTaskController } from "@factories";
export const handler = (event, _context) => {
    const controller = makeDeleteTaskController();
    return controller.handle(event.pathParameters);
};
//# sourceMappingURL=delete.js.map