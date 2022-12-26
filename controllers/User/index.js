const { auth } = require("../../database/firebaseConnection");
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");

class User {

    static async create(email, password) {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            return { isCreated: true, msg: "User created" };
        } catch (error) {
            return { isCreated: false, msg: "User not created" };
        }
    }

    static async login(email, password) {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);

            return { isLogged: true, msg: "Logged", user };
        } catch (error) {
            return { isLogged: false, msg: "Error on login", user: null };
        }
    }

}

module.exports = User;