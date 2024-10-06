import express, { Request, Response } from "express";
import sequelize from "./db/db";
import cors from "cors";
import router from './routes/index'

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(router)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Node.js!");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database:", err);
  });


