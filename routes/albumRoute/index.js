const express = require("express");
const router = express.Router();
const Albums = require("../../controllers/Albums");

router.get("/albums", async (req, res) => {
    try {
        const allAlbums = await Albums.getAll();
        res.json(allAlbums);
    } catch (error) {
        if (error) {
            console.log(error);
            res.status(500);
            res.json({
                msg: "Server error!"
            });
        }
    }
});

router.get("/albums/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const album = await Albums.getById(id);

        if (!album) {
            res.status(404);
            res.json({
                msg: "Album not found",
            });
            return;
        }

        res.json(album);

    } catch (error) {
        if (error) {
            res.status(500);
            res.json({
                msg: "Server error"
            });
        }
    }
});

module.exports = router;