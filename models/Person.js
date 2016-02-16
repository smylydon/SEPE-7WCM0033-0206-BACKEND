module.exports = function(sequelize, DataTypes) {
  return sequelize.define('person', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    sex: DataTypes.STRING,
    dob: DataTypes.DATE,
    userId: DataTypes.BIGINT
  }, {
    paranoid: true, //mark as deleted but do not delete
    underscored: true //use underscore instead of camelCase.
  });
};
