import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

const db = mongoose.connection;

const handleError = (error) => console.log(error);
const handleOpen = () => console.log('💛 MongoDB is connected!');

db.on('error', handleError);
db.once('open', handleOpen);
