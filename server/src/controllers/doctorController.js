const doctorService = require('../services/doctorService');

class DoctorController {
  
  async getPatients(req, res, next) {
    try {
      const doctorId = req.user.id; 
      const patients = await doctorService.getPatients(doctorId, req.query);

      res.status(200).json({
        success: true,
        message: "Patients fetched successfully",
        data: patients,
      });
    } catch (err) {
      next(err);
    }
  }

  
  async getPatientDetails(req, res, next) {
    try {
      const { id } = req.params;
      const patient = await doctorService.getPatientDetails(Number(id));

      if (!patient) {
        return res.status(404).json({ success: false, message: "Patient not found" });
      }

      res.status(200).json({
        success: true,
        message: "Patient details fetched successfully",
        data: patient,
      });
    } catch (err) {
      next(err);
    }
  }

async updateTreatment(req, res, next) {
  try {
    const patientId = Number(req.params.id);
    const doctorId = req.user.id;
    const treatmentData = {
      diagnosis: req.body.diagnosis,
      prescription: req.body.prescription,
      notes: req.body.notes,
    };

    const treatment = await doctorService.updateTreatment(patientId, doctorId, treatmentData);

    res.status(200).json({
      success: true,
      message: "Treatment added successfully",
      data: treatment,
    });
  } catch (err) {
    next(err);
  }
}



  async getLabReports(req, res, next) {
    try {
      const { id } = req.params;
      const reports = await doctorService.getLabReports(Number(id));

      res.status(200).json({
        success: true,
        message: "Lab reports fetched successfully",
        data: reports,
      });
    } catch (err) {
      next(err);
    }
  }


  async getAllDoctors(req, res, next) {
    try {
      const doctors = await doctorService.getAllDoctors();
      res.status(200).json({
        success: true,
        message: "Doctors fetched successfully",
        data: doctors,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new DoctorController();
