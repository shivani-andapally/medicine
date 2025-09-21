const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Medicine = require("../models/Medicine");
// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully", userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", userId: user._id, name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Recommendations based on purchase history
router.get("/rec/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("purchaseHistory.medicineId");

    if (!user) return res.status(404).json({ message: "User not found" });

    // Medicines the user already purchased
    const purchasedIds = user.purchaseHistory.map(p => p.medicineId._id);

    // Frequently purchased medicines overall (excluding user's purchases)
    const freqPurchased = await Medicine.aggregate([
      { $match: { _id: { $nin: purchasedIds } } },
      { $sample: { size: 5 } } // take 5 random
    ]);

    // Medicines from same categories as purchased medicines
    const categories = user.purchaseHistory.map(p => p.medicineId.category);
    const similarMeds = await Medicine.find({
      category: { $in: categories },
      _id: { $nin: purchasedIds }
    }).limit(5);

    // Combine and remove duplicates
    const recommendationsMap = {};
    [...freqPurchased, ...similarMeds].forEach(med => {
      recommendationsMap[med._id] = med;
    });

    const recommendations = Object.values(recommendationsMap);
    res.json(recommendations);
  } catch (err) {
    console.error("Recommendation error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /users/recommend/:medicineName
router.get("/recom/:medicineName", async (req, res) => {
  try {
    const { medicineName } = req.params;

    const baseMedicine = await Medicine.findOne({ name: medicineName });
    if (!baseMedicine) return res.status(404).json({ message: "Medicine not found" });

    const recommendations = await Medicine.find({
      category: baseMedicine.category,
      _id: { $ne: baseMedicine._id }
    }).limit(5); 

    res.json({ base: baseMedicine, recommendations });
  } catch (err) {
    console.error("Recommendation by medicine name error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
