const adminService = require('../services/adminService');

class AdminController {
  
  async createUser(req, res, next) {
    try {
      const user = await adminService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await adminService.getUsers(req.query.role);
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req, res, next) {
    try {
      const user = await adminService.getUserById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const user = await adminService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await adminService.deleteUser(req.params.id);
      res.json({ message: 'User deleted' });
    } catch (err) {
      next(err);
    }
  }

  
  async getAllPatients(req, res, next) {
    try {
      const patients = await adminService.getAllPatients();
      res.json(patients);
    } catch (err) {
      next(err);
    }
  }

  async getAllLabReports(req, res, next) {
    try {
      const reports = await adminService.getAllLabReports();
      res.json(reports);
    } catch (err) {
      next(err);
    }
  }

  async getAllBills(req, res, next) {
    try {
      const bills = await adminService.getAllBills();
      res.json(bills);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();
