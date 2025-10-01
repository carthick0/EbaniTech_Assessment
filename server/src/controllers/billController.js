// src/controllers/billController.js
const billService = require("../services/billService");
const path = require("path");

class BillController {
  async createBill(req, res, next) {
    try {
      const { patientId, amount } = req.body;
      const bill = await billService.createBill({ patientId, amount });
      res.status(201).json(bill);
    } catch (err) {
      next(err);
    }
  }

  async getAllBills(req, res, next) {
    try {
      const bills = await billService.getBills();
      res.json(bills);
    } catch (err) {
      next(err);
    }
  }

  async getBillById(req, res, next) {
    try {
      const bill = await billService.getBill(req.params.id);
      if (!bill) return res.status(404).json({ message: "Bill not found" });
      res.json(bill);
    } catch (err) {
      next(err);
    }
  }

  async deleteBill(req, res, next) {
    try {
      await billService.deleteBill(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async generateBillPDF(req, res, next) {
    try {
      const bill = await billService.getBill(req.params.id);
      if (!bill || !bill.pdfUrl)
        return res.status(404).json({ message: "PDF not found" });

      res.download(path.resolve(bill.pdfUrl));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BillController();
