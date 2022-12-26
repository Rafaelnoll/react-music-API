const { database } = require("../../database/firebaseConnection");

class Albums {

    static async getAll() {
        const albumsSnapshot = await database.collection("albums").get();
        const albums = [];
        albumsSnapshot.forEach((doc)=>{
            albums.push({
                ...doc.data(),
                id:doc.id,
            });
        });

        return albums;
    }

    static async getById(id) {
        const albumRef = database.collection("albums").doc(id);
        const albumSnapshot = await albumRef.get();
        const album = albumSnapshot.data();
        return album;
    }

}

module.exports = Albums;