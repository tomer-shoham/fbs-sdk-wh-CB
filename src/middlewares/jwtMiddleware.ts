import { Request, Response, NextFunction } from "express";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import path from "path";

export const jwtMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.headers["content-type"] === "application/jwt") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const publicKeyPath = path.resolve(
          __dirname,
          "../../secrets/nitro_cosigner_public_key.pem"
        );
        const publicKey = readFileSync(publicKeyPath, "utf8");
        const verified = jwt.verify(body, publicKey, { algorithms: ["RS256"] });

        // console.log("verified jwt", verified);

        // const decoded = jwt.decode(body, { complete: true });
        // console.log(
        //   "decoded jwt",
        //   decoded?.payload,
        //   decoded?.payload === decoded,
        // );
        // req.body = decoded?.payload || {};
        req.body = verified;
      } catch (err) {
        console.error("JWT decode error:", err);
      }
      next();
    });
  } else {
    next();
  }
};
