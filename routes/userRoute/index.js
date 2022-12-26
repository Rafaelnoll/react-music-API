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
        const userResponse = await User.create(email, password);

        if (userResponse.isCreated) {
            res.status(200);
            res.json({ error: false, msg: userResponse.msg });
            return;
        }

        res.status(500);
        res.json({ error: true, msg: userResponse.msg });
        return;
    }

    res.status(400);
    res.json({ error: true, msg: "Email and password have to be passed" });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        const userResponse = await User.login(email, password);

        if (userResponse.isLogged) {
            res.status(200);
            res.json({ error: false, msg: userResponse.msg, user: userResponse.user });
            return;
        }

        res.status(500);
        res.json({ error: true, msg: userResponse.msg, user: userResponse.user });
        return;
    }

    res.status(400);
    res.json({ error: true, msg: "Email and password have to be passed" });
});



module.exports = router;