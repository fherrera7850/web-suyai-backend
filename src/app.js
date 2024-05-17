import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth";
import indexRoutes from "./routes/index";
import tasksRoutes from "./routes/tasks";

require('dotenv').config();

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(indexRoutes);
app.use(authRoutes);
app.use(tasksRoutes);

export default app;
