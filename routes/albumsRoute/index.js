const express = require("express");
const router = express.Router();
const Albums = require("../../controllers/Albums");

router.get("/albums", async (req, res) => {
    try {
        const allAlbums = await Albums.getAll();
        res.json(allAlbums);
    } catch (error) {
        if (error) {
            res.status(500);
            res.json({
                msg: "Server error!"
            });
        }
    }
});

module.exports = router;