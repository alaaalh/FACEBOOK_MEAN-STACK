const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require("../config/config");

mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(()=> console.log('connected to mongoose successfully :)'))
  .catch(console.error);