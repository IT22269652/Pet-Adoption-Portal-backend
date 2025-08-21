import express from 'express';
import "dotenv/config";
import { connectDB } from './config/db.js';
import UserRoutes from './routes/UserRoutes.js';
import AdminRoutes from './routes/AdminRoutes.js';
import PostRoutes from "./routes/PostRoutes.js";
import CartRoutes from "./routes/CartRoutes.js";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

connectDB();

app.use('/api/users', UserRoutes);
app.use('/api/admin', AdminRoutes);
app.use("/api", PostRoutes);
app.use("/api", CartRoutes);

app.get("/", (req, res) => {
    res.send("Hello world!")
})



app.listen(PORT, () => {
    console.log(`Server is running port${PORT}`);
});