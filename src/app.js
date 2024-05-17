import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth";
import indexRoutes from "./routes/index";
import tasksRoutes from "./routes/tasks";
import productsRoutes from "./routes/productRoutes";

require('dotenv').config();
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.set("port", process.env.PORT || 5000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001' // Permite solicitudes solo desde esta URL
}));
app.use(bodyParser.json()); // Asegúrate de usar body-parser para parsear JSON

app.use(indexRoutes);
app.use(authRoutes);
app.use(tasksRoutes);
app.use(productsRoutes);

export default app;
