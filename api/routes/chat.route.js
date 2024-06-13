import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create,getMessages,deleteMessages} from '../controllers/chat.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/messages',verifyToken,getMessages)
router.delete('/messages',verifyToken,deleteMessages)

export default router;