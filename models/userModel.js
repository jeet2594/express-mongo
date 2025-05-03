import  mongoose, {  Schema } from "mongoose";

const option = {
  discriminatorKey: "type",
  collection: "users",
  timestamps: true,
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },
  },
  option
);

const User = mongoose.model("User", userSchema);

const Admin = User.discriminator(
  "Admin",
  new Schema({})
);

const Customer = User.discriminator(
  "Customer", 
  new Schema(
    {
      address: {
        type: String,
        require: true,
      },
    }
  )
);

export {
    User,
    Admin,
    Customer
}