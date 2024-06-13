import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deleteresume, getresumes } from '../controllers/resume.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getposts', getresumes)
router.delete('/deletepost/:postId/:userId', verifyToken, deleteresume)


export default router;