// repositories/doctorRepository.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const CrudRepository = require('./crudRepository');

class DoctorRepository extends CrudRepository {
  constructor() {
    super(prisma.user); 
  }

  
  async findAllDoctors() {
    return prisma.user.findMany({
      where: { role: 'DOCTOR' },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

 
  async getDoctorDashboard(doctorId) {
    return prisma.user.findUnique({
      where: { id: doctorId },
      select: {
        id: true,
        name: true,
        email: true,
        patients: {
          select: {
            id: true,
            name: true,
            age: true,
            createdAt: true,
          },
        },
        treatments: {
          select: {
            id: true,
            diagnosis: true,
            prescription: true,
            createdAt: true,
          },
        },
      },
    });
  }


  async getTreatments({ doctorId, page = 1, limit = 10, search = '' }) {
    const skip = (page - 1) * limit;

    return prisma.treatment.findMany({
      where: {
        doctorId,
        OR: [
          { diagnosis: { contains: search, mode: 'insensitive' } },
          { prescription: { contains: search, mode: 'insensitive' } },
          { patient: { name: { contains: search, mode: 'insensitive' } } },
        ],
      },
      include: {
        patient: {
          select: { id: true, name: true, age: true },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateTreatment(treatmentId, data) {
    return prisma.treatment.update({
      where: { id: treatmentId },
      data,
    });
  }


  async getLabResults(patientId) {
    return prisma.lab.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }
}

module.exports = new DoctorRepository();
