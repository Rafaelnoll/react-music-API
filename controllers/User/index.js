const { auth } = require("../../database/firebaseConnection");
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const jwt = require("jsonwebtoken");
const secret = process.env.TOKENSECRET;

class User {

    static async create(email, password) {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            return { isCreated: true, msg: "User created" };
        } catch (error) {
            return { isCreated: false, msg: "User not created" };
        }
    }

    static async authenticate(email, password) {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            const token = await jwt.sign({
                email: user.email,
                uid: user.uid,
            }, secret);

            return { isLogged: true, msg: "Successfully logged in", userToken: token };
        } catch (error) {
            return { isLogged: false, msg: "Wrong email or password", userToken: null };
        }
    }

}

module.exports = User;