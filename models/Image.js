module.exports = function(sequelize, DataTypes) {
    return sequelize.define('image', {
        type: DataTypes.STRING,
        image: DataTypes.BLOB
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
