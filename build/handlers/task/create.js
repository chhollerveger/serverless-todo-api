import { makeCreateTaskController } from "@factories";
export const handler = (event, _context) => {
    const controller = makeCreateTaskController();
    return controller.handle(event.body);
};
//# sourceMappingURL=create.js.map