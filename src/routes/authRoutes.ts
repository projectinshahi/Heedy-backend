import { Router } from 'express';
import { loginAdmin, createTestAdmin } from '../controllers/authController';

const router = Router();

router.post('/login', loginAdmin);
router.post('/setup-test-admin', createTestAdmin); // Can be called once to generate an admin

export default router;
