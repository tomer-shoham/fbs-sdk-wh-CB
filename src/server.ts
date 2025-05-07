import express from "express";
import cors from "cors";

import { PORT } from "./utils/config.js";

import { Express } from "express-serve-static-core";
import router from "./router";
import { jwtMiddleware } from "./middlewares/jwtMiddleware.js";

const startServer = () => {
  const app = express();

  configureMiddlewares(app);

  app.use(router);

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
};

const configureMiddlewares = (app: Express) => {
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
      exposedHeaders: ["Authorization"],
    })
  );
  // app.use(bodyParser.json());
  app.use(jwtMiddleware);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

export default startServer;
