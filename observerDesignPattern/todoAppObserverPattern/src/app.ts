import express, {Request, Response} from "express";
import todoRoutes from "./api/routes/todoRoutes";

const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.json("server running and up");
});

app.use(express.json());

app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
    console.log("server running");
});