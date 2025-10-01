const labRepo = require('../repositories/labRepository');

class LabService {
  
  async uploadReport(patientId, filePath) {
    return await labRepo.create({ patientId, reportUrl: filePath });
  }

  
  async getPatientLabReports(patientId) {
    return await labRepo.findByPatient(patientId);
  }

  
  async deleteLabReport(reportId) {
    return await labRepo.delete(reportId);
  }
}

module.exports = new LabService();
