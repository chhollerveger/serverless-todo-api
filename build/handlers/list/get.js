import { makeGetListController } from "@factories";
export const handler = (event, _context) => {
    const controller = makeGetListController();
    return controller.handle(event.pathParameters);
};
//# sourceMappingURL=get.js.map