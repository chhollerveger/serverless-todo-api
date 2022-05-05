import { makeGetTaskController } from "@factories";
export const handler = (event, _context) => {
    const controller = makeGetTaskController();
    return controller.handle(event.pathParameters);
};
//# sourceMappingURL=get.js.map