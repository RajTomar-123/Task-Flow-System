import express from 'express';
import User from '../model/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

const secreteKey = "swer&*&^#*&^@HJHjsdhfksdfhskfhw9853734598374";

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ status: false, message: "All files are require" })

    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ status: false, message: "Email Already registered" });

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();

    return res.status(201).json({ status: true, message: "Register successful" })
  } catch (error) {
    return res.status(400).json({ status: false, message: "Something went wrong", error: error.message })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email == 'Raj@me.com' && password == '12345') {
      return res.json({ success: true, type: 'admin' });
    }

    const employee = await User.findOne({ email });
    if (!employee) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    const token = jwt.sign({ id: employee._id, name: employee.name }, secreteKey, {
      expiresIn: '1h',
    });
    console.log("Generated Token:", token);
    console.log("User ID:", employee._id);
    console.log("Name:", employee.name);

    res.json({ success: true, type: 'employee', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find({}, "name email"); // only return name & email
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Cannot fetch users", error: err.message });
  }
});


export default router;