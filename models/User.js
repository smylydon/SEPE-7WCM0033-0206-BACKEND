module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
  }, {
    paranoid: true,
    underscored: true
  });
};
