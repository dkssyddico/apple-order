import express from 'express';
import './db.js';
import morgan from 'morgan';

const app = express();
const port = 4000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`💚 App is listening at http://localhost:${port}`);
});
