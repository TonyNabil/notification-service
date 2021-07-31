import express from "express"
import path from "path"
import logger from "morgan";
import "./config/mongoose"

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("../swagger.json");


import notificationRouter from "./routes/notificationRouter";
import userRouter from "./routes/userRouter";
const app = express();


app.use(express.json());
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
app.use(logger("dev"));


app.use("/v1", notificationRouter);
app.use("/v1", userRouter);


export default app;
