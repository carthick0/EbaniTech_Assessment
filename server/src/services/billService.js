
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const billRepo = require("../repositories/billRepository");

exports.createBill = async ({ patientId, amount }) => {
  
  const patientIdInt = Number(patientId);
  const amountInt = Number(amount);

  const pdfDir = path.join(__dirname, "../../uploads");
  if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir);

  const pdfPath = path.join(pdfDir, `bill-${Date.now()}.pdf`);

  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(pdfPath);
  doc.pipe(writeStream);

  doc.fontSize(20).text("Hospital Bill", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Patient ID: ${patientIdInt}`);
  doc.text(`Amount: ₹${amountInt}`);
  doc.text(`Date: ${new Date().toLocaleDateString()}`);
  doc.end();

  
  await new Promise((resolve) => writeStream.on("finish", resolve));

  
  const bill = await billRepo.create({
    patientId: patientIdInt,
    amount: amountInt,
    pdfUrl: pdfPath,
  });

  return bill;
};

exports.getBills = () => billRepo.getAll();
exports.getBill = (id) => billRepo.getById(id);
exports.deleteBill = (id) => billRepo.delete(id);
exports.getBillsByPatient = (patientId) => billRepo.findByPatient(Number(patientId));
