import * as AWS from "aws-sdk";
const { STAGE, DYNAMODB_LOCAL_STAGE, DYNAMODB_LOCAL_ACCESS_KEY_ID, DYNAMODB_LOCAL_SECRET_ACCESS_KEY, DYNAMODB_LOCAL_ENDPOINT } = process.env;
export const makeAwsConfig = () => {
    const config = { region: "sa-east-1" };
    if (STAGE === DYNAMODB_LOCAL_STAGE) {
        config.accessKeyId = DYNAMODB_LOCAL_ACCESS_KEY_ID;
        config.secretAccessKey = DYNAMODB_LOCAL_SECRET_ACCESS_KEY;
        config.endpoint = DYNAMODB_LOCAL_ENDPOINT;
    }
    AWS.config.update(config);
};
//# sourceMappingURL=aws-config.js.map