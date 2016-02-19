module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    paranoid: true, //mark as deleted but do not delete
    underscored: true //use underscore instead of camelCase.
  });
};
