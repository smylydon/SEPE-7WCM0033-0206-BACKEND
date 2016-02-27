module.exports = function(sequelize, DataTypes) {
    return sequelize.define('paymentmethod', {
        name: DataTypes.STRING(32),
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
