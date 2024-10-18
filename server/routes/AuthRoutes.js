import { register } from '../controllers/AuthController.js';
import { Router }  from 'express';

const AuthRoutes = Router();

AuthRoutes.post("/register",register)

export default AuthRoutes;