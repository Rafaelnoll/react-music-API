const express = require("express");
const router = express.Router();
const validateEmail = require("../../utils/validadeEmail");
const validatePassword = require("../../utils/validatePassword");
const User = require("../../controllers/User");

router.post("/user", async (req, res) => {
    const { email, password, repeatedPassword } = req.body;
    const emailIsValid = validateEmail(email);
    const passwordIsValid = validatePassword(password, repeatedPassword);

    if (emailIsValid && passwordIsValid) {
        const isCreated = await User.create(email, password);

        if (isCreated) {
            res.status(200);
            res.json({ msg: "User created" });
            return;
        }

        res.status(500);
        res.json({ msg: "Server error" });
        return;
    }

    res.status(400);
    res.json({ msg: "Email and password have to be passed" });
});

module.exports = router;