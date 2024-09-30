import { Amplify } from "aws-amplify";

export const awsExports = {
        "REGION" : "ap-soutneast-1",
        "USER_POOL_ID": process.env.NEXT_PUBLIC_USER_POOL_ID,
        "USER_POOL_APP_CLIENT_ID": process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
        oauth: {},
    }