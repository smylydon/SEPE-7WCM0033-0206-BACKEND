module.exports = function(sequelize, DataTypes) {
    return sequelize.define('sale', {
        method: DataTypes.STRING,
        receipt: DataTypes.STRING(128),
        description: DataTypes.STRING,
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
