import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sequelize from "./database/db_connet";

import roleRouter from './router/role';
import cardRouter from './router/carts';
import orderRouter from './router/orders';
import categoryRouter from './router/categories';
import productRouter from './router/products';
import userRouter from './router/user';
import fileRouter from './router/upload';


const app = express();
dotenv.config({ path: `.env` });

app.use(express.json({ limit: '2450mb' }));

app.use(express.urlencoded({ extended: true }));
const connectToDb = async () => {
    await sequelize.sync({ force: false });
    try {
        await sequelize.authenticate();
        console.log("Database Connected successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

var corsOptions = {
    origin: function (origin: any, callback: any) {
        callback(null, true);
    },
    credentials: true,
};

app.use(cors(corsOptions));

app.use("/", roleRouter);
app.use("/", cardRouter);
app.use("/orders", orderRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/user", userRouter);
app.use("/file", fileRouter);

app.listen(process.env.PORT, () => {
    connectToDb();
    console.log(`Server is running on port ${process.env.PORT}`);
});
