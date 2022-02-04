import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './db.js';
import userRouter from './routers/user.js';
import productRouter from './routers/product.js';
import orderRouter from './routers/order.js';

const app = express();
const port = 4000 || process.env.PORT;

app.use(morgan('dev'));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`💚 App is listening at http://localhost:${port}`);
});
