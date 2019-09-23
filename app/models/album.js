const errors = require('../errors'),
  logger = require('../logger');

module.exports = (sequelize, DataTypes) => {
  const album = sequelize.define(
    'album',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      albumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'album_id'
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
      }
    },
    {
      timestamps: true,
      tableName: 'albums',
      underscored: true
    }
  );
  album.findOneAlbum = data =>
    album
      .findOne({
        where: data
      })
      .catch(err => {
        logger.error(err.message);
        throw errors.databaseError(`Error finding album with the query ${JSON.stringify(data)} in database`);
      });
  album.createAlbum = albumToCreate =>
    album.create(albumToCreate).catch(err => {
      logger.error(err);
      throw errors.dataBaseError('Error creating album in the database');
    });
  album.findOrCreateAlbum = albumToFindOrCreate =>
    album
      .findOrCreate({
        where: { albumId: albumToFindOrCreate.id, userId: albumToFindOrCreate.userId },
        defaults: { title: albumToFindOrCreate.title }
      })
      .catch(err => {
        logger.error(err);
        throw errors.dataBaseError('Error finding or creating album in the database');
      });

  return album;
};
