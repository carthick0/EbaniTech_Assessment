const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const CrudRepository = require('./crudRepository');

class BillRepository extends CrudRepository {
  constructor() {
    super(prisma.bill);
  }

  async findByPatient(patientId) {
    return await this.model.findMany({ where: { patientId } });
  }
}

module.exports = new BillRepository()
