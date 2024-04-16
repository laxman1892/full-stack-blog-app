const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/blogapp-db");
}

const db = mongoose.connection;
db.once("connected", () => console.log("Connected to MongoDB!"));

const salt = bcrypt.genSaltSync(10);
const jwtSalt = 'lshjogihqwoihq209u523h5klhdklhfowieh';

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const userDetails = await User.create({ username, email, password:bcrypt.hashSync(password, salt)});
    res.json(userDetails);
    } catch (error) {
      res.status(400).json(error);
    }
    
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userDetails = await User.findOne({username: username});
  const isPasswordCorrect = bcrypt.compareSync(password, userDetails.password);
  if (isPasswordCorrect) {
    //* when the user is logged in
  jwt.sign({username, id: userDetails._id}, jwtSalt, {} , (error, token) => {
      if (error) throw error; 
      res.cookie('token', token).json('Ok!');
    })
  } else {
    res.status(400).json('Wrong Credentials');
  }
});

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, jwtSalt, {}, (error, info) => {
    if (error) throw error;
    res.json(info);
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('Ok!');
})

app.listen(4000, () => {
    console.log("Server started on port 4000");
});