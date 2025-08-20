import express from 'express';
import { registerUser, loginUser, updateUser, deleteUser, getAllUsers } from '../controller/UserController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.get('/', getAllUsers);

export default router;