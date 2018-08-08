import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import socketIO from 'socket.io';

import interventionRoutes from './routes/interventions';
import loginRoutes from './routes/login';
import userRoutes from './routes/users';

// load environment variables
const config = dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

// allows cross-origin HTTP requests => https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors({ credentials: true, origin: 'http://localhost:8000'}));

// allows access to req object => https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
app.use(bodyParser.json());

app.use(cookieParser());

app.use('/interventions', interventionRoutes);
app.use('/login', loginRoutes);
app.use('/users', userRoutes);

io.on('connection', socket => {
  console.log('user connected');

  socket.on('SEND_INTERVENTION', (data) => {
    console.log(data);
    // io.emit sends to all clients
    io.emit('RECEIVE_INTERVENTION', data);
    // socket.broadcast.emit sends to all client expect the one sending the message
    // socket.broadcast.emit('RECEIVE_INTERVETION', data);
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

