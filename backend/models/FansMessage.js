const mongoose = require("mongoose");

const fansMessageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("FansMessage", fansMessageSchema);
