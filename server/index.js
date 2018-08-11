import acl from 'express-acl';
import bodyParser from 'body-parser';
import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import uuid from 'uuid/v4';

import companyRoutes from './routes/companies';
import interventionRoutes from './routes/interventions';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';

// load environment variables
const config = dotenv.config();

const app = express();

const RedisStore = connectRedis(session);

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

// allows cross-origin HTTP requests => https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors({ credentials: true, origin: 'http://localhost:8000'}));

// allows access to req object => https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
app.use(bodyParser.json());

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(
  session({    genid: (req) => {
      return uuid();
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD
    })
  })
);

app.use((req, res, next) => {
  console.log('Session id', req.session.id);
  next();
});

app.use('/auth', authRoutes);
app.use('/companies', companyRoutes);
app.use('/interventions', interventionRoutes);
app.use('/users', userRoutes);

app.listen(8080, () => {
  console.log('App is now listening on port 8080');
});
