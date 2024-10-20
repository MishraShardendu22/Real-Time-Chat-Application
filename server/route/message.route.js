import { getMessage, sendMessage } from '../controller/message.controller.js';
import Conversation from '../model/conversation.model.js';
import Message from '../model/message.model.js';
import User from "../model/user.model.js"
import express from 'express';

const router = express.Router();

// main routes go here : 

router.post("/send/:id",isLogin,sendMessage)
router.get("/:id",isLogin,getMessage)

// till here 

export default router;