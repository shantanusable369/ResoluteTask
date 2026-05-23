import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes.js';
//import studentRoutes from './routes/studentsRoutes.ts';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', studentRoutes);

export default app;