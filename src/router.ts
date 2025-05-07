import { Router, Request, Response } from "express";
import { configChangeSignReq, txSignReq } from "./controller";

const router: Router = Router();

router.get("/health", (_req: Request, res: Response) => {
  console.log("alive");
  res.status(200).send("Alive");
});

router
  .post("/v2/tx_sign_request", txSignReq)
  .post("/v2/config_change_sign_request", configChangeSignReq);

export default router;
