import bcrypt from 'bcrypt';    // for password encryption
import jwt from 'jsonwebtoken'; // for authentication
import User from '../models/User.js';

/* REGISTER USER */
// async function for registration logic to make a call to mongodb
export const register = async (req, res) => {
    try {

        // structuring parameters from the request body
        const {
            firstName,
            lastName,
            email,
            password,
            budgets,
            transactions,
        } = req.body;

        // generate salt to encrypt password (hashing)
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // create new user object
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            budgets,
            transactions,
        });
        // save this user object
        const savedUser = await newUser.save();
        // send response of status code 201 if user is created and saved
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/* LOGIN USER */
// async function for login logic to make a call to mongodb
export const login = async (req, res) => { 
    try {

        // destructuring parameters from the request body
        const { email, password } = req.body;
        // use mongoose to find user by email
        const user = await User.findOne({ email: email });
        // if user is not found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        // if password does not match
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // create javawebtoken for sign in
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        // delete password from user object so it's not sent to front end
        delete user.password;
        // send response of status code 200 if user is logged in
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}