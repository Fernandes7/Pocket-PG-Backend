import express, { Express, Request, Response } from "express";
import cors from "cors"
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import { connection } from "./connections/database";
import UserRoute from "./router/userRoutes";
import LocationRoute from "./router/locationRoutes"

//Fastify Instance
const app: Express = express();

//Database Connection
connection;

//Basic Initializations (env and port)
dotenv.config();
const port = process.env.PORT || 3000;

//Middlewares
app.use(cors({origin:process.env.FRONTENDURL,credentials:true}))
app.use(express.json())
app.use(cookieParser())

//Routes
app.use("/", UserRoute);
app.use("/",LocationRoute)

//Health checking route
app.get("/healthcheck", (req: Request, res: Response) => {
  res.send("Server of Pocket PG is in Healthy condition");
});

//Server listening
app.listen(port, () => {
  console.log(`Server is Running in Port ${port}`);
});
