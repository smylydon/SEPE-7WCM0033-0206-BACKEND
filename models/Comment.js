module.exports = function(sequelize, DataTypes) {
    return sequelize.define('comment', {
        name: DataTypes.STRING(64),
        email: {
            type: DataTypes.STRING(64),
            validate: {
                isEmail: true
            }
        },
        subject: DataTypes.STRING(64),
        message: DataTypes.STRING
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
