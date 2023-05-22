import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import connectDb from "./config/db";
import morgan from "morgan";

import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

connectDb();

const port = process.env.PORT || 5000;

const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req: Request, res: Response) => res.send("server is ready"));
}
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on ports: ${port}`));
