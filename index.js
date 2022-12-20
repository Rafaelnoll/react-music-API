const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3030;

const albumsRoute = require("./routes/albumsRoute");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(albumsRoute);

app.listen(PORT, () => {
    console.log(`Server is on port ${PORT}`);
});