import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import crypto from 'crypto';
import express from 'express';

import interventionRoutes from './routes/interventions';

const app = express();

// allows cross-origin HTTP requests => https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

// allows access to req object => https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
app.use(bodyParser.json());

app.use('/interventions', interventionRoutes);

app.listen(8080, () => {
  console.log('App is now listening on port 8080');
});

