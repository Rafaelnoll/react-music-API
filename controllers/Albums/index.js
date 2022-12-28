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

    static async addInCollections(userUid, album) {
        const likedAlbumsSnapshot = await database.collection("likedAlbums").get();
        let likedAlbums = [];
        likedAlbumsSnapshot.forEach((doc) => {
            likedAlbums.push({ ...doc.data() });
        });

        const filtredAlbums = likedAlbums.filter(element => {
            return element.userUid === userUid && element.albumId === album.albumId;
        });

        if (filtredAlbums[0] !== undefined) {
            return null;
        }

        const likedAlbum = await database.collection("likedAlbums").add({
            userUid,
            albumId: album.albumId,
            name: album.name,
            image: album.image,
            totalOfTracks: album.totalOfTracks,
            artist: album.artist,
        });

        return likedAlbum;
    }

    static async getAlbumsInCollection(userUid) {
        try {
            const albumsSnapshot = await database.collection("likedAlbums").get();
            let userAlbums = [];

            albumsSnapshot.forEach((doc) => {
                if (doc.data().userUid === userUid) {
                    userAlbums.push({ ...doc.data() });
                }
            });

            return userAlbums;
        } catch (error) {
            return null;
        }
    }
    
    static async getTopAlbums() {
        try {
            const albums = await this.getAll();
            const topAlbums = albums.filter((album)=> album.topChart);
            console.log(topAlbums);

            return topAlbums;
        } catch (error) {
            return null;
        }
    }

}

module.exports = Albums;