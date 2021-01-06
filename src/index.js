import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { connectDatabase } from './config/database.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDatabase(process.env.MONGODB_URL);

// router
app.use(routes);
app.listen(process.env.PORT, () => {
  console.log(`[API] listening on port ${process.env.PORT}`);
});
