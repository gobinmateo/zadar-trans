import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// allows cross-origin HTTP requests => https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

// allows access to req object => https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log(req.body);
});

app.listen(8080, () => {
  console.log('App is now listening on port 8080');
});

