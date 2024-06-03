const express = require("express");
const router = express.Router();
const Recipe = require("./Recipe");

router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        await Recipe.findByIdAndUpdate(id, updates);
        res.status(200).json({ message: "Recipe updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
