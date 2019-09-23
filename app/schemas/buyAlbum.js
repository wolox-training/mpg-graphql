const yup = require('yup');

const buyAlbumSchema = yup.object().shape({
  albumId: yup
    .number('albumId must be a number')
    .required('albumId is required')
    .positive('albumId must be positive')
    .integer('albumId must be integer')
});

module.exports = buyAlbumSchema;
