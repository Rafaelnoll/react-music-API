const express = require("express");
const app = express();
const PORT = 3030;
const albumsRoute = require("./routes/albumsRoute");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(albumsRoute);

app.listen(PORT, () => {
    console.log(`Server is on port ${PORT}`);
});