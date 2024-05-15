"use strict";
import { Sequelize } from "sequelize";
// import fs from "fs";
// import path from "path";

// const process = require("process");
// const config = require("../conf/config");
// import config from '../conf/config'
const db: any = {};

let sequelize: any;
// if (config.use_env_variable) {
//     sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//     sequelize = new Sequelize(
//         "Learn_DataBase",
//         "postgres",
//         "root",
//         {
//             "username": "postgres",
//             "password": "root",
//             "database": "Learn_DataBase",
//             "host": "localhost",
//             "dialect": "postgres"
//         }
//     );
// }

sequelize = new Sequelize(
    "e-commerce",
    "postgres",
    "root",
    {
        "username": "postgres",
        "password": "root",
        "database": "e-commerce",
        "host": "localhost",
        "dialect": "postgres"
    }
);


// Get the list of all model files
console.log(__dirname);

// const modelsPath = path.join(__dirname, "../models");
// const modelFiles = fs
//     .readdirSync(modelsPath)
//     .filter((file) => file.endsWith(".model.ts"));

// Load and associate all the models
// for (const modelFile of modelFiles) {
//   const modelPath = path.join(modelsPath, modelFile);
//   const model = require(modelPath).default; // Assuming default export is the model
//   console.log("model", model)

//   // Call the associate function if defined
//   if (model.associate) {
//     model.associate(db.models);
//   }
// }

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

export default sequelize;
