import { makeDeleteListController } from "@factories";
export const handler = (event, _context) => {
    const controller = makeDeleteListController();
    return controller.handle(event.pathParameters);
};
//# sourceMappingURL=delete.js.map