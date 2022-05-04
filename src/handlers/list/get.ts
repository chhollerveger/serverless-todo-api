import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from "aws-lambda";
import { makeGetListController } from "@factories";

export const handler: APIGatewayProxyHandler = (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  const controller = makeGetListController();
  return controller.handle(event);
}