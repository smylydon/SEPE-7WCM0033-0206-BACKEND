module.exports = function(sequelize, DataTypes) {
    return sequelize.define('payment', {
        name: DataTypes.STRING(32),
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
