import express, {Request, Response} from "express";
import dotenv from 'dotenv';
import todoRoutes from "./api/routes/todoRoutes";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Server running flawlessly");
});

app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`[Backend] Server running at ${PORT}`);
});
