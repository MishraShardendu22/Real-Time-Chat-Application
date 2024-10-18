import { login, register } from '../controllers/AuthController.js';
import { Router }  from 'express';

const AuthRoutes = Router();

AuthRoutes.post("/register",register)
AuthRoutes.post("/login",login)

export default AuthRoutes;