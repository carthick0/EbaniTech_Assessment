const labService = require('../services/labService');
const upload = require('../middlewares/uploadMiddlware');

class LabController {
  async uploadReport(req, res, next) {
    try {
      const patientId = req.body.patientId;
      const filePath = req.file.path; 
      const report = await labService.uploadReport(patientId, filePath);
      res.status(201).json(report);
    } catch (err) {
      next(err);
    }
  }

  async getLabReports(req, res, next) {
    try {
      const reports = await labService.getPatientLabReports(req.params.patientId);
      res.json(reports);
    } catch (err) {
      next(err);
    }
  }

  async deleteLabReport(req, res, next) {
    try {
      await labService.deleteLabReport(req.params.id);
      res.json({ message: 'Lab report deleted' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new LabController();
