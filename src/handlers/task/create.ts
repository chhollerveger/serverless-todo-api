import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from "aws-lambda";
import { makeCreateTaskController } from "@factories";

export const handler: APIGatewayProxyHandler = (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  const controller = makeCreateTaskController();
  return controller.handle(event.body);
}