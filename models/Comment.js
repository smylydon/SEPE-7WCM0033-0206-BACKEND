module.exports = function(sequelize, DataTypes) {
    return sequelize.define('comment', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        subject: DataTypes.STRING,
        message: DataTypes.STRING,
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
