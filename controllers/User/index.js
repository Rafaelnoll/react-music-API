const { auth } = require("../../database/firebaseConnection");
const { createUserWithEmailAndPassword } = require("firebase/auth");

class User {

    static async create(email, password) {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            return { isCreated: true, msg: "User created" };
        } catch (error) {
            return { isCreated: false, msg: "User not created" };
        }
    }

}

module.exports = User;