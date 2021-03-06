module.exports = function(sequelize, DataTypes) {
    return sequelize.define('country', {
        code: DataTypes.STRING(2),
        name: DataTypes.STRING(64),
        eea: DataTypes.BOOLEAN
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
