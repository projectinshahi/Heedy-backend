import express from 'express';
import { getAddresses, addAddress, deleteAddress, getAllCustomers, toggleCustomerStatus } from '../controllers/userController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/addresses')
  .get(protect, getAddresses)
  .post(protect, addAddress);

router.delete('/addresses/:addressId', protect, deleteAddress);

// Admin routes
router.get('/admin/customers', protect, authorize('admin', 'superadmin'), getAllCustomers);
router.put('/admin/customers/:id/toggle-status', protect, authorize('admin', 'superadmin'), toggleCustomerStatus);

export default router;
