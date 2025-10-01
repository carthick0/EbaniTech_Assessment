const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");
const authMiddleware = require("../middlewares/authMiddleware");


router.use(authMiddleware(["ADMIN", "RECEPTIONIST", "DOCTOR"]));

router.post("/create", billController.createBill);

module.exports = router;
