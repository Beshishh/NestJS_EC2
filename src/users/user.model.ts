import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  email: string;
  password: string;
  username: string;
  bio: string;
  image: string;
}
