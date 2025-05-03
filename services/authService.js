import jwt  from "jsonwebtoken";
import { Customer } from "../models/userModel.js";
import bcrypt from 'bcrypt';

const login = async (email, password) => {
  const user = await Customer.findOne({ email });
  console.log(user);
  
  if (!user) {  
    throw new Error('Invalid credentials');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token };
}

const register = async (name, email, password) => {
    console.log('email', email);
    
  const existingUser = await Customer.findOne({ email });
  console.log('existingUser', existingUser);
  
  if (existingUser) {
    throw new Error('User already exists');
  }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Customer({
      name,
      email,
      password: hashedPassword,
    });
    const user =await newUser.save();
    return user;
}
export default {
  login,
  register
};