import path from "path";
import jwt from "jsonwebtoken";
import { readFileSync } from "fs";

export const signTx = (requestId: string, action: string): string => {
  try {
    const responsePayload = {
      requestId: requestId,
      action: action,
    };

    console.log("requestId", requestId);
    const cbPrivateKeyPath = path.resolve(
      __dirname,
      "../../secrets/callback_private.pem"
    );
    const cbPrivateKey = readFileSync(cbPrivateKeyPath, "utf8");

    const signedResponse = jwt.sign(responsePayload, cbPrivateKey, {
      algorithm: "RS256",
    });

    return signedResponse;
  } catch (err: any) {
    throw new Error(`error while signing tx - ${err.message}`);
  }
};
