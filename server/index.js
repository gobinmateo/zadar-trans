import acl from 'express-acl';
import bodyParser from 'body-parser';
import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import session from 'express-session';
import socketIO from 'socket.io';
import uuid from 'uuid/v4';

import authRoutes from './routes/auth';
import companyRoutes from './routes/companies';
import interventionRoutes from './routes/interventions';
import partnerRoutes from './routes/partners';
import userRoutes from './routes/users';

import verifyToken from './authentication/verify.token.middleware';

// load environment variables
const config = dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const RedisStore = connectRedis(session);

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

// allows cross-origin HTTP requests => https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors({ credentials: true, origin: 'http://localhost:8000'}));

// allows access to req object => https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser(process.env.SESSION_SECRET));


// use express session with redis
app.use(
  session({
    genid: (req) => {
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

// verify if authentication token has been provided
app.use(verifyToken);

//app.use(acl.authorize.unless({ path: ['/auth/login', '/auth/logout'] }));

app.use('/auth', authRoutes);
app.use('/companies', companyRoutes);
app.use('/interventions', interventionRoutes);
app.use('/partners', partnerRoutes);
app.use('/users', userRoutes);

io.on('connection', socket => {
  console.log('user connected');

  socket.on('INTERVENTION_CREATED', (intervention) => {
    socket.broadcast.emit('INTERVENTION_CREATED', intervention);
  });

  socket.on('INTERVENTION_NOTIFICATION', (newNotification) => {
    socket.broadcast.emit('INTERVENTION_NOTIFICATION', newNotification);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(8080, () => {
  console.log('App is now listening on port 8080');
});

