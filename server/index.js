const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const app = express();

// ! enabling cors and json parsing
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

// * 👇  Connecting to MongoDB database
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/blogapp-db");
}

const db = mongoose.connection;
db.once("connected", () => console.log("Connected to MongoDB!"));

const salt = bcrypt.genSaltSync(10); // salt for password hashing
const jwtSalt = 'lshjogihqwoihq209u523h5klhdklhfowieh'; //jwt salt for signing tokens

// todo 👇 signup route to get user details from the body and putting the details on database
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const userDetails = await User.create({ username, email, password:bcrypt.hashSync(password, salt)});
    res.json(userDetails);
    } catch (error) {
      res.status(400).json(error);
    }
    
});

// todo 👇 login route  that will check if the entered credentials are valid or not by comparing with the data in the database
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userDetails = await User.findOne({username: username});
  const isPasswordCorrect = bcrypt.compareSync(password, userDetails.password);
  if (isPasswordCorrect) {
    //* generating a jwt token when the user is logged in
  jwt.sign({username, id: userDetails._id}, jwtSalt, {} , (error, token) => {
      if (error) throw error; 
      // * set the token as a cookie and sending back the token with response header
      res.cookie('token', token).json({
        id: userDetails._id,
        username,
      });
    })
  } else {
    res.status(400).json('Wrong Credentials');
  }
});

// todo 👇 profile route to verify the user 
app.get('/profile', (req, res) => {
  // * destructuring token from cookies
  const {token} = req.cookies;
  jwt.verify(token, jwtSalt, {}, (error, info) => {
    if (error) throw error;
    res.json(info);
  });
});

// todo 👇 logout route
app.post('/logout', (req, res) => {
  // ? destroying the cookie by setting the token to empty 
  res.cookie('token', '').json('Ok!');
})

// creating post route👇
app.post('/post', uploadMiddleware.single('file') , async (req, res) => {
  const {originalname, path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);
  const {title, summary, content} = req.body;

  const PostDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath
  });

  res.json(PostDoc);
});

app.get('/post', async (req, res) => {
  res.json(await Post.find());
})

app.listen(4000, () => {
    console.log("Server started on port 4000");
});