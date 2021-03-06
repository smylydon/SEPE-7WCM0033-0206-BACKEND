module.exports = function(sequelize, DataTypes) {
    return sequelize.define('person', {
        firstname: DataTypes.STRING(64),
        middlenames: DataTypes.STRING(64),
        lastname: DataTypes.STRING(64),
        sex: {
            type: DataTypes.STRING(1),
            validate: {
                is: /^(m|f)$/i
            }
        },
        dob: DataTypes.DATE,
        email: {
            type: DataTypes.STRING(64),
            validate: {
                isEmail: true
            }
        },
        password: DataTypes.STRING,
        authorization: DataTypes.INTEGER
    }, {
        paranoid: true, //mark as deleted but do not delete
        underscored: true //use underscore instead of camelCase.
    });
};
