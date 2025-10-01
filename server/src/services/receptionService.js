const patientRepo = require('../repositories/patientRepository');

class ReceptionService {
  async createPatient(data) {
    return await patientRepo.create(data);
  }

  async getAllPatients(query) {
    const { doctorId, search } = query;
    if (search) return await patientRepo.searchByName(search);
    if (doctorId) return await patientRepo.findByDoctor(Number(doctorId));
    return await patientRepo.findAll();
  }

  async getPatient(id) {
    return await patientRepo.findById(Number(id));
  }

  async updatePatient(id, data) {
    return await patientRepo.update(Number(id), data);
  }

  async deletePatient(id) {
    return await patientRepo.delete(Number(id));
  }
}

module.exports = new ReceptionService();
