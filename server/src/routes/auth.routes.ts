import { Router } from 'express';
import AuthController from '../controllers/auth.controllers';
import logIn from '../middleware/login.middleware';
import register from '../middleware/register.middleware';
import resetPasswordRoute from './resetPassword.routes';

const router = Router();
const authController = new AuthController();

router
	.post('/login', logIn, authController.sendUser)
	.post('/register', register, authController.sendUser)
	.get('/profile', authController.sendExistingProfile)
	.post('/google', authController.googleAuth)
	.post('/check_email', authController.checkEmail)
	.use(resetPasswordRoute);

export default router;
