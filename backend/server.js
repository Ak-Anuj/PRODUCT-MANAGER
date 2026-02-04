import express from "express"
import 'dotenv/config'
import connectDB from "./database/db.js"
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
import productRoute from "./routes/productRoutes.js"

import cors from 'cors'
import "./config/passport.js"

const app = express()

const PORT = process.env.PORT || 8000

app.use(express.json())

const allowedOrigins = [
  "http://localhost:5173",
  "https://product-manager-green-six.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.set("trust proxy", 1);
app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use("/product", productRoute)


// http://localhost:8000/user/register


app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is listening at port ${PORT}`);  
})