const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  composition: { type: String },
  category: { type: String },
  price: { type: Number },
  symptoms: {type: [String]},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Medicine", MedicineSchema);
