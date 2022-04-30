import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from "aws-lambda";
import { makeCreateListController } from "@factories";

export const handler: APIGatewayProxyHandler = (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  const controller = makeCreateListController();
  return controller.handle(event.body);
}