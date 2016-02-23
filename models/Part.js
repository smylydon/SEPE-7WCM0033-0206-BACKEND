module.exports = function(sequelize, DataTypes) {
    return sequelize.define('part', {
        name: DataTypes.STRING,
        stock: DataTypes.INTEGER,
        description: DataTypes.STRING,
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
