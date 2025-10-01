const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const CrudRepository = require('./crudRepository');

class LabRepository extends CrudRepository {
  constructor() {
    super(prisma.lab);
  }

  async findByPatient(patientId) {
    return await this.model.findMany({ where: { patientId } });
  }
}

module.exports = new LabRepository();
