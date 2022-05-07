import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from "aws-lambda";
import { makeUpdateTaskController } from "@factories";

export const handler: APIGatewayProxyHandler = (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  const controller = makeUpdateTaskController();
  return controller.handle(event.body, event.pathParameters);
}