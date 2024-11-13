import express from "express";
import { createdApiKey } from "../controllers/apiKeyController.js";

const apiKeyRoutes = express.Router();
apiKeyRoutes.post('/api/keys', /*auth*/createdApiKey );
export default apiKeyRoutes;











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