import express, { Request, Response } from 'express';
import userRoutes from './resources/users/users.routes';
import postRoutes from './resources/posts/posts.routes';
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(bodyParser.json());


app.use('/api', userRoutes);
app.use('/api', postRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});