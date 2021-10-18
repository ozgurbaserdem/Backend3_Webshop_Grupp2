const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const Product = require('../models/ProductModel');

exports.registerUser = async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      fullName,
      displayName,
      email,
      password,
      phoneNumber,
      city,
      address,
      zipcode,
    } = req.body;

    // Validations

    if (
      !fullName
      || !displayName
      || !email
      || !password
      || !phoneNumber
      || !address
      || !city
      || !zipcode
    ) {
      return res
        .status(400)
        .json({ errorMessage: 'Please fill in all required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({
        errorMessage: 'Please enter a password with at least 6 characters.',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        errorMessage: 'This email already exists',
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await new User({
      fullName,
      displayName,
      phoneNumber,
      address,
      city,
      zipcode,
      email,
      password: passwordHash,
    });

    // save user to db

    const savedUser = await newUser.save();

    // sign the token
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET_USER,
    );

    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.error('Register:', err);
    res.status(500).send();
  }
};

exports.loginUser = async (req, res, next) => {
  console.log(req.body);

  try {
    const { email, password } = req.body;

    // Validations
    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: 'Please fill in all required fields' });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ errorMessage: 'Wrong email or password.' });
    }
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: 'Wrong email or password.' });
    }

    if (existingUser.isAdmin) {
      const token = jwt.sign(
        {
          user: existingUser._id,
        },
        process.env.JWT_SECRET_ADMIN,
      );

      res
        .cookie('token', token, {
          httpOnly: true,
        })
        .send();
    }

    if (!existingUser.isAdmin) {
      console.log('Not Admin');
      const token = jwt.sign(
        {
          user: existingUser._id,
        },
        process.env.JWT_SECRET_USER,
      );
      res
        .cookie('token', token, {
          httpOnly: true,
        })
        .send();
    }

    // send the token in a HTTP only cookie
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.loggedInUser = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.json(false);
    jwt.verify(token, process.env.JWT_SECRET_USER);
    res.send(true);
  } catch (err) {
    console.log(err);
    res.json(false);
  }
};

exports.loggedInAdmin = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.json(false);
    jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    res.send(true);
  } catch (err) {
    console.log(err);
    res.json(false);
  }
};

exports.logoutUser = (req, res, next) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      displayName,
      email,
      password,
      phoneNumber,
      city,
      address,
      zipcode,
    } = req.body;

    // Validations

    if (
      !fullName
      || !displayName
      || !email
      || !password
      || !phoneNumber
      || !address
      || !city
      || !zipcode
    ) {
      return res
        .status(400)
        .json({ errorMessage: 'Please fill in all required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({
        errorMessage: 'Please enter a password with at least 6 characters.',
      });
    }
    /*
        const existingUser = await User.findOne({ email })
        if (existingUser) {
          return res.status(400).json({
            errorMessage: "This email already exists",
          })
        } */

    // Hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const updatedUser = {
      fullName,
      displayName,
      phoneNumber,
      address,
      city,
      zipcode,
      email,
      password: passwordHash,
    };

    // save user to db
    const savedUser = await User.findOneAndUpdate(id, updatedUser, { new: true });

    res.send(savedUser);
  } catch (err) {
    console.error('Register:', err);
    res.status(500).send();
  }
};
