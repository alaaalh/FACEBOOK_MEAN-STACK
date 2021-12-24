const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("../config/config");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: [3, "min length for name"],
      max: 50,
    },
    email: {
      unique: true,
      required: true,
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      min: [8, "min length for password"],
      max: 50,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    education: {
      type: String,
      lowercase: true,
    },
    address: {
      type: String,
      lowercase: true,
    },
    education: {
      type: String,
      lowercase: true,
    },
    avatar: {
      type: String,
      lowercase: true,
    },
  },
  {
    timestamp: { createdAt: "created_at" },
  }
);

userSchema.methods.filterResponse = function () {
  const User = this;
  delete User._doc._id;
  delete User._doc.__v;
  delete User._doc.password;
  delete User._doc.created_at;
  delete User._doc.updated_at;
  return User;
};

userSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 10);
    return next();
  }
  next();
});

userSchema.methods.generateToken = function () {
  const User = this;
  const {_id} = User
  return jwt.sign({_id}, SECRET_TOKEN);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
