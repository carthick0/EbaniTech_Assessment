const patientRepo = require("../repositories/patientRepository");
const labRepo = require("../repositories/labRepository");
const doctorRepo = require('../repositories/doctorRepsitory')
const treatmentRepo = require("../repositories/treatmentRepository");

class DoctorService {
  
  async getPatients(doctorId, { search = "", page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;
    if (search) {
      return await patientRepo.searchByName(search); 
    }
    return await patientRepo.findByDoctor(doctorId);
  }


  async getPatientDetails(patientId) {
    return await patientRepo.findById(patientId,);
  }

  
  async updateTreatment(patientId, doctorId, treatmentData) {
  return await treatmentRepo.addTreatment(patientId, doctorId, treatmentData);
}


  
  async getLabReports(patientId) {
    return await labRepo.findByPatient(patientId);
  }

  
  async getAllDoctors() {
    return await doctorRepo.findAllDoctors();
  }
}

module.exports = new DoctorService();
