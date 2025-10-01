const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');


router.use(authMiddleware(['ADMIN']));


router.post('/users', adminController.createUser);
router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

router.get('/reports/patients', adminController.getAllPatients);
router.get('/reports/labs', adminController.getAllLabReports);
router.get('/reports/bills', adminController.getAllBills);

module.exports = router;
