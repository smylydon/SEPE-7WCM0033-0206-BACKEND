module.exports = function(sequelize, DataTypes) {
    return sequelize.define('car', {
        model: DataTypes.STRING(64),
        year: DataTypes.INTEGER,
        milage: DataTypes.STRING,
        chassis_number: DataTypes.STRING,
        licence_plate: DataTypes.STRING(64),
        body_type: DataTypes.STRING(32),
        description: DataTypes.STRING,
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
