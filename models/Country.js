module.exports = function(sequelize, DataTypes) {
    return sequelize.define('country', {
        name: DataTypes.STRING(64),
        eea: DataTypes.BOOLEAN
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
