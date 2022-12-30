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

router.get("/topCharts", async (req, res) => {
    try {
        const topAlbums = await Albums.getTopAlbums();
        res.json(topAlbums);
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
    const { albumId, name, image, totalOfTracks, artist } = req.body;
    const albumData = {
        albumId,
        name,
        image,
        totalOfTracks,
        artist,
    }

    try {
        const album = await Albums.addInCollections(uid, albumData);
        res.status(200);
        res.json({ error: false, album });
        return;
    } catch (error) {
        res.status(500);
        res.json({ error: true, album: null });
    }
});

router.get("/collection/album", validate, async (req, res) => {
    try {
        const { uid } = req.user;
        const albums = await Albums.getAlbumsInCollection(uid);
        res.status(200);
        res.json({ error: false, albums });
        return;
    } catch (error) {
        res.status(500);
        res.json({ error: true, albums: null });
    }
});

router.delete("/collection/album/:id", validate, async (req, res) => {
    try {
        const { uid } = req.user;
        const { id } = req.params;
        await Albums.deleteAlbumInCollection(uid, id);
        res.status(200);
        res.json({ error: false, msg: "Deleted" });
        return;
    } catch (error) {
        res.status(500);
        res.json({ error: true, msg: "Server Error!" });
    }
});

module.exports = router;