module.exports = function(sequelize, DataTypes) {
    return sequelize.define('image', {
        type: DataTypes.STRING(24),
        image: DataTypes.BLOB
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
