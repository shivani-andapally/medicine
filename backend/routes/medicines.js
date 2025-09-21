const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");


// ✅ GET all medicines
router.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST add new medicine
router.post("/", async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Search by name or category or symptons
// Stop words list
const STOP_WORDS = [
  "i","me","my","mine","we","our","ours","you","your","yours","he","him","his",
  "she","her","hers","it","its","they","them","their","theirs",
  "is","are","was","were","be","been","being","am",
  "a","an","the","for","and","of","in","on","at","to","from","by","with","as",
  "that","this","these","those","then","but","or","if","because","while","about",
  "into","through","during","before","after","above","below","up","down","over",
  "under","again","further","once","here","there","when","where","why","how","all",
  "any","both","each","few","more","most","other","some","such","no","nor","not",
  "only","own","same","so","than","too","very","can","will","just","should","now",
  "what","which","who","whom","whose","do","does","did","doing","have","has","had",
  "having","may","might","must","shall","could","would","also","like","many","much",
  "made","make","makes","want","wanting","take","taken","get","getting","got","go",
  "going","went","been","become","becomes","becoming"
];

// GET /medicines/search?q=<query>
router.get("/search", async (req, res) => {
  try {
    res.set("Cache-Control", "no-store"); // prevent caching

    const query = req.query.q?.trim();

    if (!query) {
      const allMedicines = await Medicine.find();
      return res.json(allMedicines);
    }

    const keywords = query
      .split(/\s+/)
      .map(w => w.toLowerCase())
      .filter(w => !STOP_WORDS.includes(w));

    if (keywords.length === 0) {
      const allMedicines = await Medicine.find();
      return res.json(allMedicines);
    }

    // Fetch all medicines first
    const medicines = await Medicine.find();

    // Compute relevance score
    const scored = medicines.map(med => {
      let score = 0;

      const fields = [
        med.name,
        med.category,
        med.composition,
        ...(med.symptoms || [])
      ].map(f => f.toLowerCase());

      keywords.forEach(kw => {
        fields.forEach(field => {
          if (field.includes(kw)) score += 1;
        });
      });

      return { medicine: med, score };
    });

    // Filter out score 0 and sort descending
    const results = scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.medicine);

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// ✅ GET medicine by ID
router.get("/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ error: "Medicine not found" });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST multiple medicines
router.post("/many", async (req, res) => {
  try {
    const medicines = await Medicine.insertMany(req.body); // expects an array
    res.status(201).json(medicines);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



// ✅ PUT update medicine
router.put("/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!medicine) return res.status(404).json({ error: "Medicine not found" });
    res.json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ DELETE medicine
router.delete("/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) return res.status(404).json({ error: "Medicine not found" });
    res.json({ message: "Medicine deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
