module.exports = function(sequelize, DataTypes) {
    return sequelize.define('manufacturer', {
        name: DataTypes.STRING(64)
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
