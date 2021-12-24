const express = require("express");
const app = express();
require("dotenv").config();
const { PORT } = require("./config/config");
require("./db/mongoose");
const multer = require("multer");
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}.png`);
    },
});

const upload = multer({ storage: storage })
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// app.use(bodyParser);
app.use('/images', express.static('images'));
app.use('/users', userRouter);


app.post("/profile", upload.single("avatar"), async (req, res) => {
  const file = await res.file;
  res.send(file);
});


// Handle error
app.use((err, req, res, next) =>{
    res.send(err)
})

const onConnect = () => console.log("Server up to port", PORT);

app.listen(PORT, onConnect);
