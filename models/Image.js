module.exports = function(sequelize, DataTypes) {
    return sequelize.define('image', {
        fieldname: DataTypes.STRING(24),
        originalname: DataTypes.STRING(64),
        encoding: DataTypes.STRING(64),
        mimetype: DataTypes.STRING(24),
        destination: DataTypes.STRING(128),
        filename: DataTypes.STRING(128),
        path: DataTypes.STRING(128),
        size: DataTypes.INTEGER
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
