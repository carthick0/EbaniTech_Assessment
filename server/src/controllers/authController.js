const authService = require('../services/authService');

class AuthController {
  async register(req, res, next) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
