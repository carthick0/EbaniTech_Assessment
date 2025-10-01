const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class TreatmentRepository {
  async addTreatment(patientId, doctorId, data) {
    if (!patientId) throw new Error("patientId is required");
    if (!doctorId) throw new Error("doctorId is required");

    return prisma.treatment.create({
      data: {
        patientId,
        doctorId,
        diagnosis: data.diagnosis || null,
        prescription: data.prescription || null,
        notes: data.notes || null,
      },
    });
  }

  async findByPatient(patientId) {
    return prisma.treatment.findMany({ where: { patientId } });
  }
}

module.exports = new TreatmentRepository();
