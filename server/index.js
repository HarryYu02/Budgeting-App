import express from 'express';          // for express library 
import bodyParser from 'body-parser';   // for processing request body
import cors from 'cors';                // for cross origin request
import mongoose from 'mongoose';        // for mongodb access
import dotenv from 'dotenv';            // for env variables
import morgan from'morgan';             // for logging
import helmet from 'helmet';            // for request safety
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
// for testing purposes
import User from './models/User.js';
import Budget from './models/Budget.js';
import Transaction from './models/Transaction.js';
import { user, budgets, transactions } from './data/index.js';

/* CONFIGURATIONS */
dotenv.config(); // set environment
const app = express(); // invoke express app to use middleware
app.use(express.json());
app.use(helmet()); 
app.use(helmet.crossOriginResourcePolicy( { policy: 'cross-origin' }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* ROUTES */
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);

        /* Add Data ONE TIME */
        // User.insertMany(user);
        // Budget.insertMany(budgets);
        // Transaction.insertMany(transactions);
    });
}).catch((error) => console.error(`${error} did not connect`));

