require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 80;

const albumsRoute = require("./routes/albumRoute");
const userRoute = require("./routes/userRoute");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(albumsRoute);
app.use(userRoute);

app.listen(PORT, () => {
    console.log(`Server is on port ${PORT}`);
});