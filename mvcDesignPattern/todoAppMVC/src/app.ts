// dependencies
import express, {Request, Response} from "express";
import todoRoutes from "./routes/todo.routes";
import { connectDb } from "./config/db";
import { jsonParser } from "./middleware/jsonParser";

// app init
const app = express();
const PORT = 3000;

// connect to db
connectDb();

// use the json parser middleware
app.use(jsonParser);

// test route
app.get("/", (req: Request, res: Response) => {
    res.send("Server is up and running");
});

// delegate '/api/todos' to todoRoutes
app.use("/api/todos", todoRoutes);

// server init
app.listen(PORT, () => {
    console.log(`[Backend] Server running at ${PORT}`);
});