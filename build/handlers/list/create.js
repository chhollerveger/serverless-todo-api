import { makeCreateListController } from "@factories";
export const handler = (event, _context) => {
    const controller = makeCreateListController();
    return controller.handle(event.body);
};
//# sourceMappingURL=create.js.map