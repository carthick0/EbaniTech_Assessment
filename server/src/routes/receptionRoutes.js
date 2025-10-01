const express = require('express');
const router = express.Router();
const receptionController = require('../controllers/receptionController');
const authMiddleware = require('../middlewares/authMiddleware');


router.use(authMiddleware(['RECEPTIONIST', 'ADMIN']));

router.post('/create', receptionController.createPatient);
router.get('/patients', receptionController.getPatients);
router.get('/:id', receptionController.getPatient);
router.put('/:id', receptionController.updatePatient);
router.delete('/:id', receptionController.deletePatient);

module.exports = router;
