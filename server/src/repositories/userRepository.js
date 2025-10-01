const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const CrudRepository = require('./crudRepository');

class UserRepository extends CrudRepository {
  constructor() {
    super(prisma.user);
  }

  async findByEmail(email) {
    return await this.model.findUnique({ where: { email } });
  }

  async getDoctors() {
    return await this.model.findMany({ where: { role: 'DOCTOR' } });
  }
}

module.exports = new UserRepository();
