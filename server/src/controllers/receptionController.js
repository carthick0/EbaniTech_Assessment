const receptionService = require('../services/receptionService');

class ReceptionController {
  async createPatient(req, res, next) {
    try {
      const patient = await receptionService.createPatient(req.body);
      res.status(201).json(patient);
    } catch (err) {
      next(err);
    }
  }

  async getPatients(req, res, next) {
    try {
      const patients = await receptionService.getAllPatients(req.query);
      res.json(patients);
    } catch (err) {
      next(err);
    }
  }

  async getPatient(req, res, next) {
    try {
      const patient = await receptionService.getPatient(req.params.id);
      res.json(patient);
    } catch (err) {
      next(err);
    }
  }

  async updatePatient(req, res, next) {
    try {
      const patient = await receptionService.updatePatient(req.params.id, req.body);
      res.json(patient);
    } catch (err) {
      next(err);
    }
  }

  async deletePatient(req, res, next) {
    try {
      await receptionService.deletePatient(req.params.id);
      res.json({ message: 'Patient deleted' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ReceptionController();
