import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import AuthenticateUserController from "../useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../useCases/createUser/CreateUserController";
import { RefreshTokenUserController } from "../useCases/refreshTokenUser/RefreshTokenUserController";

const router = Router();

const createUserController = new CreateUserController();
const autUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post('/users', createUserController.handle);
router.post('/login', autUserController.handle);
router.post('/refresh-token', refreshTokenUserController.handle);

router.get('/courses', ensureAuthenticated, (request, response) => {
  return response.json(['NodeJS', 'ReactJS', 'React Native'])
})

export default router;