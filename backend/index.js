import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import userRoute from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,PATCH,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));


app.use(cors({
    origin: true,
    credentials: true
}))


app.get('/', (req, res) => {
    res.send("Server is running..")
})

app.use('/user', userRoute);
app.use('/users', taskRoutes);
app.use('/api', taskRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("Failed to connect database ", err))

mongoose.createConnection(process.env.DATABASE_URL2)
console.log("DB2 connected successfully")


app.listen(3000, () => {
    console.log("server is running.. 3000")
})