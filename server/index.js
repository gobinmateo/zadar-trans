import acl from 'express-acl';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import companyRoutes from './routes/companies';
import interventionRoutes from './routes/interventions';
import loginRoutes from './routes/login';
import userRoutes from './routes/users';

// load environment variables
const config = dotenv.config();

const app = express();

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

// allows cross-origin HTTP requests => https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors({ credentials: true, origin: 'http://localhost:8000'}));

// allows access to req object => https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
app.use(bodyParser.json());

app.use(cookieParser());

app.use('/companies', companyRoutes);
app.use('/interventions', interventionRoutes);
app.use('/login', loginRoutes);
app.use('/users', userRoutes);

app.listen(8080, () => {
  console.log('App is now listening on port 8080');
});
