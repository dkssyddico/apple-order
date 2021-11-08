import express from 'express';
import './db.js';
import morgan from 'morgan';
import userRouter from './routers/user.js';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(morgan('dev'));

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`💚 App is listening at http://localhost:${port}`);
});
