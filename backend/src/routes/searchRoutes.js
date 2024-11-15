import { keywordSearch } from "../controllers/searchController.js";
import { Router } from "express";

const router = Router();

router.post("/search/basic", keywordSearch);
// router.post("/search/semantic", semanticSearch);

