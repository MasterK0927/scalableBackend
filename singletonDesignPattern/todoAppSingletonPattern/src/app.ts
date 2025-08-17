// import
import express, {Request, Response} from  "express";
import todoRoutes from "./api/routes/TodoRoutes";

// init
const app = express();
const PORT = 3000;

app.use(express.json());

// test route
app.get('/', (req: Request, res: Response) => {
    res.send("server running");
});

app.use('/api/todos', todoRoutes);

// run
app.listen(PORT, () => {
    console.log(`[Backend] server running at ${PORT}`);
});