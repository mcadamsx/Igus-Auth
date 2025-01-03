import { Router } from 'express';
import { register, login, requestPasswordReset, resetPassword } from '../controllers/authController';
import { checkAdmin } from '../middlewares/authMiddleware';

const authRouter = Router();


authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/reset-password', requestPasswordReset);
authRouter.patch('/update-password', resetPassword);

export default authRouter;
