const express = require("express");
const router = express.Router();
const Recipe = require("./Recipe");

router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        if (recipes.length === 0) {
            res.status(200).json({ message: "No recipes available" });
        } else {
            res.status(200).json(recipes);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
