import { makeUpdateTaskController } from "@factories";
export const handler = (event, _context) => {
    const controller = makeUpdateTaskController();
    const data = event.pathParameters && event.body;
    return controller.handle(data);
};
//# sourceMappingURL=update.js.map