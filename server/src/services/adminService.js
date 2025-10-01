const userRepo = require('../repositories/userRepository');
const patientRepo = require('../repositories/patientRepository');
const labRepo = require('../repositories/labRepository');
const billRepo = require('../repositories/billRepository');

class AdminService {
  
  async createUser(data) {
    return await userRepo.create(data);
  }

  async getUsers(role) {
    if (role) return await userRepo.model.findMany({ where: { role } });
    return await userRepo.findAll();
  }

  async getUserById(id) {
    return await userRepo.findById(id);
  }

  async updateUser(id, data) {
    return await userRepo.update(id, data);
  }

  async deleteUser(id) {
    return await userRepo.delete(id);
  }

 
  async getAllPatients() {
    return await patientRepo.findAll();
  }

  async getAllLabReports() {
    return await labRepo.findAll();
  }

  async getAllBills() {
    return await billRepo.findAll();
  }
}

module.exports = new AdminService();
