const express = require("express");
const router = express.Router();
const adminPesanController = require("../controllers/adminPesanController");

router.get("/review-vc", adminPesanController.getReviews);
router.post("/review-vc", adminPesanController.createReview);
router.delete("/review-vc/:id", adminPesanController.deleteReview);

router.get("/fans-message", adminPesanController.getMessages);
router.put("/fans-message/approve/:id", adminPesanController.approveMessage);
router.delete("/fans-message/:id", adminPesanController.deleteMessage);

module.exports = router;
