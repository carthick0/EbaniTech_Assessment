const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/userRepository');
const { JWT_SECRET } = require('../config/serverConfig');

class AuthService {
  async register(data) {
    const hashed = await bcrypt.hash(data.password, 10);
    return await userRepo.create({ ...data, password: hashed });
  }

  async login(email, password) {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    return { user, token };
  }
}

module.exports = new AuthService();
