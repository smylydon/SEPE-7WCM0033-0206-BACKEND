module.exports = function(sequelize, DataTypes) {
    return sequelize.define('car', {
        model: DataTypes.STRING,
        year: DataTypes.INTEGER,
        milage: DataTypes.STRING,
        chassisNumber: DataTypes.STRING,
        licencePlate: DataTypes.STRING,
        bodyType: DataTypes.STRING,
        description: DataTypes.STRING,
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
