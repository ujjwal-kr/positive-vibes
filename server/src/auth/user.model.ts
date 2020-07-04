import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  setting: { type: String, default: 'basic' },
});

// Password Hashing before saving in database
UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (e) {
    return next(e);
  }
});

export interface User extends mongoose.Document {
  name?: string;
  password?: string;
  email?: string;
  setting?: string;
}
