// import express from "express";
// import mongoose from "mongoose";
// const app = express();

// //to access json in raw postman
// app.use(express.json())

// app.get("/",(req,res) =>{
//     res.send("Welcome, server created")
// })
// app.listen(4000, ()=>{
//     console.log("server is working")
// } );
// app.get("/users/all", async (req,res) => {

//     const users = await User.find({})
//     res.json({
//         success: true,
//         users,
//     });
// });
// app.post("/users/new", async (req,res) => {
//     //real data
//     const { name , email, password}=req.body;
//     await User.create({
//         name,
//         email,
//         password,
//     //data made to be printed on db
//     // await User.create({
//         // name: "Ananyamoti",
//         // email: "moti@gmail.com",
//         // password: "djkand",
//     })
//     res.json({
//         success: true,
//         message:"Registered successfully"
        
//     });
// });
// mongoose.connect("mongodb://127.0.0.1:27017",{
//     dbName:"backendapi",
// }).then(()=> console.log("Database connected")).catch((e)=> console.log(e));

// const schema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
// })

// const User = mongoose.model("apitut",schema);
import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});

// Using Error Middleware
app.use(errorMiddleware);