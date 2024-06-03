const express = require("express");
const router = express.Router();
const Recipe = require("./Recipe");

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const recipe = await Recipe.create({
            name: data.name,
            description: data.description,
            cuisine: data.cuisine,
            time: data.time
        });
        res.status(201).json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
