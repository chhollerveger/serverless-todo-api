import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from "aws-lambda";
import { makeUpdateListController } from "@factories";

export const handler: APIGatewayProxyHandler = (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  const controller = makeUpdateListController();
  return controller.handle(event.body, event.pathParameters);
}