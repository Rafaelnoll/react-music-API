const express = require("express");
const router = express.Router();
const Albums = require("../../controllers/Albums");
const validate = require("../../middlewares/auth");

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

router.post("/collection/album", validate, async (req, res) => {
    const { uid } = req.user;
    const { trackId } = req.body;

    try {
        const track = await Albums.addInCollections(uid, trackId);
        res.status(200);
        res.json({ error: false, track });
        return;
    } catch (error) {
        res.status(500);
        res.json({ error: false, track: null });
    }
});

module.exports = router;