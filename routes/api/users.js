import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';

import validateRegisterInput from '../../validation/registerValidation';
import validateLoginInput from '../../validation/loginValidation';
import User from '../../models/User';

const router = express.Router();
/**
 * handle image uploading
 */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

const limits = { fileSize: 1024 * 1024 * 15 };

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, limits, fileFilter });

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', upload.single('userAvatar'), (req, res) => {
  
  // form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  console.log('body', req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  if(!req.file){
    return res.status(400).json({"error":"no file uploaded"});
  }
  

  // Check the user is already in the database
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    }
    
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar: req.file.path,
    });
    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(userSave => res.json(userSave))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  console.log('Body', req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;
  const { password } = req.body;
  // find user by email
  User.findOne({ email }).then(user => {
    // check if user exists
    if (!user) {
      return res.status(404).json({ error: 'Email not found' });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        // Sign token
        jwt.sign(
          payload,
          process.env.SECRET,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({ success: true, token: `Bearer ${token}` });
          }
        );
      } else {
        return res.status(400).json({ error: 'Password incorrect' });
      }
    });
  });
});

/**
 * get user data response
 */
router.get('/user/:id', (req, res) => {
  const { id } = req.params;

  console.log('id ==> ', id);
  try {
    const getUser = async userId => {
      const userData = await User.findById(userId);
      res.json(userData);
    };
    getUser(id);
  } catch (error) {
    console.log('getUserData', error);
  }
});

export default router;
