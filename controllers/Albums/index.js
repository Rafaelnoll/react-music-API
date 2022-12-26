const { database } = require("../../database/firebaseConnection");

class Albums {

    static async getAll() {
        const albumsSnapshot = await database.collection("albums").get();
        const albums = [];
        albumsSnapshot.forEach((doc) => {
            albums.push({
                ...doc.data(),
                id: doc.id,
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

    static async addInCollections(userUid, trackId) {
        const likedAlbumsSnapshot = await database.collection("likedAlbums").get();
        let likedAlbums = [];
        likedAlbumsSnapshot.forEach((doc) => {
            likedAlbums.push({ ...doc.data() });
        });

        const filtredAlbums = likedAlbums.filter(element => {
            return element.userUid == userUid && element.trackId == trackId;
        });
        
        if(filtredAlbums[0] !== undefined){
            return;
        }

        const likedAlbum = await database.collection("likedAlbums").add({
            userUid,
            trackId,
        });

        return likedAlbum;
    }

}

module.exports = Albums;