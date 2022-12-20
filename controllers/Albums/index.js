const { database } = require("../../database/firebaseConnection");

class Albums {

    static async getAll() {
        const albumsSnapshot = await database.collection("albums").get();
        const albums = [];
        albumsSnapshot.forEach((doc)=>{
            albums.push(doc.data());
        });

        return albums;
    }

}

module.exports = Albums;