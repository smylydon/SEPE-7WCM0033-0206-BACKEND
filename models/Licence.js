module.exports = function(sequelize, DataTypes) {
    return sequelize.define('licence', {
        type: DataTypes.STRING(24),
        country: DataTypes.STRING(24)
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
