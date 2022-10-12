require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
const router = require("./routes");

const sequelize = require("./db");
const models = require("./models");
const path = require("path");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

app.listen(PORT, async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(PORT);
});