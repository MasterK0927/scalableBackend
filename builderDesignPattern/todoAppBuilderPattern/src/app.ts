import express, {Request, Response} from "express";
import todoRoutes from "./api/routes/TodoRouter";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("server running and up");
});

app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
    console.log("server up and running");
});