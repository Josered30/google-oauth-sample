import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import authRoutes from './routes/auth';

const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// midlewares
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());    

app.use('/api/auth', authRoutes);

export default app;