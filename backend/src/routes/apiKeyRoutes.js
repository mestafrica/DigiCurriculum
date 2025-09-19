// filepath: [developerRoutes.js](http://_vscodecontentref_/3)
import express from "express";
import { requestApiKey } from "../controllers/apiKeyController.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.post("/developer/api-key", isAuthenticated, requestApiKey);

export default router;










// import express from ('express');
// import publicController from ('../controllers/publicController.js');
// import { authenticateApiKey } from ('../middlewares/authenticate.js');

// // List all entries 
// router.get('/public', authenticateApiKey(['student', 'teacher', 'admin']), publicController.listPublic);

// //
// router.get('/public/:id', authenticateApiKey(['teacher', 'admin']), api.getPublicById);

// // Search with filters 
// router.get('/public/search', authenticateApiKey(['student', 'teacher', 'admin']), publicController.searchPublic);

// export default router; 