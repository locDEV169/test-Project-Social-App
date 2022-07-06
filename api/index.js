const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const cardRoute = require("./routes/listCard");
const commentRouter = require("./routes/comment");
const uploadRouter = require("./routes/upload");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");

dotenv.config();
const db =
    "mongodb+srv://root:1234@cluster0.eibio.mongodb.net/?retryWrites=true&w=majority";
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
    })
    .then(() => console.log("DB success connect "))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use(
    fileUpload({
        createParentPath: true,
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("uploads"));

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.use("/api/card", cardRoute);
app.use("/api/comment", commentRouter);
app.use("/api/upload", uploadRouter);

app.listen(port, () => {
    console.log(`BE server running is  ${port} `);
});
