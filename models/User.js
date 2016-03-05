module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        email: {
            type: DataTypes.STRING(64),
            validate: {
                isEmail: true
            }
        },
        password: DataTypes.STRING,
        authorization: DataTypes.INTEGER(3)
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
