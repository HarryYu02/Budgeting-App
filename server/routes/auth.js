import express from 'express';
import { register, login } from '../controllers/auth.js';

// set up the express router
const router = express.Router();

// register controller (logic of endpoints)
router.post('/register', register); 

// login controller
router.post('/login', login); 


export default router;