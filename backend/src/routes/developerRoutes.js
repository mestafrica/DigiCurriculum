import { Router } from "express";
import { loginDeveloper, signupDeveloper } from "../controllers/developerController.js";

const developerRouter = Router()

// Routes
developerRouter.post('/developers/signup', signupDeveloper);

developerRouter.post('/developers/login', loginDeveloper);


// export router
export default developerRouter