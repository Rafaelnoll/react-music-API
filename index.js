const express = require("express");
const app = express();
const PORT = 3030;
const Albums = require("./controllers/Albums");

app.get("/", (req, res) => {
    Albums.getAll()
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    res.send("ok");
});

app.listen(PORT, () => {
    console.log(`Server is on port ${PORT}`);
});