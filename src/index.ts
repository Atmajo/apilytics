import "./config/module-alias";

import express, { Express } from "express";
import { indexRouter } from "@/routers";
import { config } from "@/config/config";

const app: Express = express();
const port = config.port;

app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/api/${config.version}`, indexRouter);

app.listen(port, async () => {
  console.info(`Server is running at http://localhost:${port}`);
});
