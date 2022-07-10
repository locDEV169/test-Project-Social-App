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
const http = require("http");
const { Server } = require("socket.io");

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

const server = http.createServer(app);

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.use("/api/card", cardRoute);
app.use("/api/comment", commentRouter);
app.use("/api/upload", uploadRouter);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_data", (data) => {
        console.log(data)
        socket.join(data);
    });

    // socket.on("send_message", (data) => {
    //     socket.to(data.room).emit("receive_message", data);
    // });
});

server.listen(port, () => {
    console.log(`BE server running is  ${port} `);
});
