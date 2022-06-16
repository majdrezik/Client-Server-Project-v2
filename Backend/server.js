const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const fallback = require("express-history-api-fallback");

const port = process.env.PORT || 5560;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const uri = "mongodb+srv://client-server-project:client-server@cluster0.adl3q.mongodb.net/test";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const promocodeRouter = require('./routes/promocodes');
const usersRouter = require('./routes/users');

app.use('/promocodes', promocodeRouter);
app.use('/users', usersRouter);

// if(process.env.NODE_ENV === "production"){
  // for deployment
app.use(express.static(__dirname+ "/Frontend/build"))
const root = __dirname+ "/Frontend/build"
app.use(fallback('index.html', { root }));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "/Frontend/build", "index.html"))
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
