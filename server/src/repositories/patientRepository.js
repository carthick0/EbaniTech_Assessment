const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const CrudRepository = require('./crudRepository');

class PatientRepository extends CrudRepository{
  constructor() {
    super(prisma.patient); 
  }
  
  async findByDoctor(doctorId) {
    return await this.model.findMany({ where: { doctorId } });
  }

  async searchByName(name) {
    return await this.model.findMany({ where: { name: { contains: name, mode: 'insensitive' } } });
  }
}

module.exports = new PatientRepository();
