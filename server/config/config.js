require('dotenv').config()


module.exports = {
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    PORT: process.env.PORT,
    SECRET_TOKEN: process.env.SECRET_TOKEN
}