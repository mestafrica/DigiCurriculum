import { Router } from "express";
import { developerPermission, isAuthenticated } from "../middlewares/auth.js";
import { deleteDeveloper, getAllDeveloper, getSingleDeveloper, loginDeveloper, signupDeveloper, updateDeveloper } from "../controllers/developerController.js";

const developerRouter = Router()

// Routes
developerRouter.post('/developers/signup', signupDeveloper);

developerRouter.post('/developers/login', loginDeveloper);

// Developer management routes
developerRouter.get('/developer/:id', isAuthenticated, getSingleDeveloper);

developerRouter.get('/developers', isAuthenticated, getAllDeveloper);

developerRouter.patch('/developer/:id', isAuthenticated, updateDeveloper);

developerRouter.delete('/developer/:id', isAuthenticated, deleteDeveloper)


// export router
export default developerRouter