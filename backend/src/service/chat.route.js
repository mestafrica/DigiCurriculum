import { Router } from "express";
import { handleChatRequest } from "./chat.controller.js";

const chatRouter = Router();

chatRouter.post("/chat", handleChatRequest);

export default chatRouter;