import express, { Express, Request, Response } from "express";
import cors from "cors"
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import { connection } from "./connections/database";
import UserRoute from "./router/userRoutes";
import LocationRoute from "./router/locationRoutes"
import HostelRoute from "./router/hostelRoutes"
import SentimentalAnlyzerRoute from "./router/sentimentalAnalyserRoutes"

//Fastify Instance
const app: Express = express();

//Database Connection
connection;

//Basic Initializations (env and port)
dotenv.config();
const port = process.env.PORT || 3000;

//Middlewares
app.use(cors({origin:'http://localhost:3000',credentials:true}))
app.use(cookieParser())
app.use(express.json())


//Routes
app.use("/", UserRoute);
app.use("/",LocationRoute)
app.use("/",HostelRoute)
app.use("/",SentimentalAnlyzerRoute)

//Health checking route
app.get("/healthcheck", (req: Request, res: Response) => {
  res.send("Server of Pocket PG is in Healthy condition");
});

//Server listening
app.listen(port, () => {
  console.log(`Server is Running in Port ${port}`);
});
