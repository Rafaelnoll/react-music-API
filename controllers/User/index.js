const { auth } = require("../../database/firebaseConnection");

class User {

    static async create(email, password) {
        try {
            await auth.createUser({
                email,
                password,
            });

            return { isCreated: true, msg: "User created" };
        } catch (error) {
            return { isCreated: false, msg: error.message };
        }
    }

}

module.exports = User;