const { auth } = require("../../database/firebaseConnection");

class User {

    static async create(email, password) {
        try {
            await auth.createUser({
                email,
                password,
            });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}

module.exports = User;