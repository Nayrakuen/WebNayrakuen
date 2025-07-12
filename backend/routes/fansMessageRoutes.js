const express = require("express");
const router = express.Router();
const fansMessageController = require("../controllers/fansMessageController");

router.get("/", fansMessageController.getMessages);
router.post("/", fansMessageController.postMessage);
router.delete("/:id", fansMessageController.deleteMessage);

module.exports = router;
