const express = require("express");
const bodyparser= require("body-parser");
const { createServer } =require("node:http");

const{ Server } =require("socket.io");

const mongoose =require( "mongoose");
const  connectToSocket  =require ("./controllers/socketManager.js");

const cors =require ("cors");
const router =require ("./routes/user.js");

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
const httpStatus =require("http-status");
const  User  =require("./models/user.js");
const bcrypt =require("bcrypt");
const { hash } =require("bcrypt");

const  crypto =require("crypto");
const { Meeting } =require("./models/meeting.js");

const PORT =process.env.PORT ||8000;
const  url ="mongodb://127.0.0.1:27017/Video_call";
app.use(cors());
app.use(bodyparser.json({ limit: "40kb" }));
app.use(bodyparser.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v2/user", router);

app.listen(PORT,()=>{
    console.log("app started");
    mongoose.connect(url);
    console.log("connected");
});