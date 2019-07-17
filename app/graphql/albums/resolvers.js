const { findAlbumById, findPhotosByAlbumId } = require('../../services/albums');

exports.getAlbum = (parent, params) => findAlbumById(params.id);
exports.getPhotos = parent => findPhotosByAlbumId(parent.id);
