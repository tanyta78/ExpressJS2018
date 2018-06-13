const Genre = require('../models/genreModel');

const crud = require('../infrastructure/mongooseCrud');
const genres = crud(Genre);

module.exports = {
    create: genre =>
        new Promise((resolve, reject) => {
            genres
                .create(genre)
                .then(createGenre => resolve(createGenre))
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        }),
    get: id =>
        genres.get(id),
    getAll: () =>
        genres.getAll(),
    delete: id =>
        new Promise((resolve, reject) => {
            genres
                .get(id)
                .then(existingEntity => {
                    if(existingEntity.memes.length > 0){
                        var message = `Cannot delete genre with id "${id}". It contains memes.`;
                        console.log(message);
                        reject(message);
                        return;
                    }

                    genres
                        .delete(id)
                        .then(() => resolve())
                        .catch(err => {
                            console.log(err);
                            reject(err);
                        });
                });
        })
};