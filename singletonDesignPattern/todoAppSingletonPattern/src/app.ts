// import
import express, {Request, Response} from  "express";

// init
const app = express();
const PORT = 3000;

// test route
app.get('/', (req: Request, res: Response) => {
    res.send("server running");
});

// run
app.listen(PORT, () => {
    console.log(`[Backend] server running at ${PORT}`);
});