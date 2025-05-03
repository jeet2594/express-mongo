import { Customer } from "../models/userModel.js";
const list = async () => {
  const users = await Customer.find({});
  return users;
};

export default {
  list,
};
