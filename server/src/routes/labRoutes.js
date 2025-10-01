const express = require('express');
const router = express.Router();
const labController = require('../controllers/labController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddlware');

router.use(authMiddleware(['LAB']));

router.post('/upload', upload.single('report'), labController.uploadReport);
router.get('/patient/:patientId', labController.getLabReports);
router.delete('/:id', labController.deleteLabReport);

module.exports = router;
