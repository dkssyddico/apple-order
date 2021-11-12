import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 1, // 1은 고객 0은 admin
      required: true,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, parseInt(process.env.SALT_ROUNDS));
  }
});

const User = mongoose.model('User', userSchema);

export default User;
