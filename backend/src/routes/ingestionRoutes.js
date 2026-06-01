import { Router } from "express";
import multer from "multer";
import { ingestCurriculum } from "../controllers/ingestionController.js";

const router = Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Route for document ingestion
router.post('/ingest', upload.single('file'), ingestCurriculum);

export default router;
