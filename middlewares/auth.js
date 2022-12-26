const jwt = require("jsonwebtoken");
const secret = process.env.TOKENSECRET;

async function validate(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401);
        res.json({ error: true, msg: "Not authorized" });
        return;
    }

    const [, token] = authorization.split(" ");

    try {
        const user = jwt.verify(token, secret);
        req.user = user;
        return next();
    } catch (error) {
        res.status(401);
        res.json({ error: true, msg: "Not authorized" });
        return;
    }
}

module.exports = validate;