import { Request, Response } from "express";
import { txSignRequest } from "./service";

export const txSignReq = async (req: Request, res: Response): Promise<void> => {
  try {
    // console.log("tx Headers:", req.headers);
    // console.log("tx Body:", req.body);
    const requestId = req.body.requestId;
    const signedResponse = await txSignRequest(requestId);
    res.status(200).send(signedResponse);
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Failed to retrieve tx status", message: err.message });
  }
};

export const configChangeSignReq = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("config change sign post req", req);
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Failed to retrieve tx status", message: err.message });
  }
};
