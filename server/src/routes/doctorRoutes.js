const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware(['DOCTOR']));


router.get("/patients", doctorController.getPatients);


router.get("/patients/:id", doctorController.getPatientDetails);


router.put("/patients/:id/treatment", doctorController.updateTreatment);


router.get("/patients/:id/labs", doctorController.getLabReports);

module.exports = router;