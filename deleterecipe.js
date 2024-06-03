const express = require("express");
const router = express.Router();
const Recipe = require("./Recipe");

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
