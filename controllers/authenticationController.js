var jwt = require("jsonwebtoken");

var authenticationController = function(User) {

  var login = function(req, res) {
    console.log('req:', req.body.email);
    User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    }).then(function(user) {
      if (user) {
        res.status(200).json({
          success: true,
          message: "Authentication success",
          token: jwt.sign(user, process.env.JWT_SECRET, {
            expiredsInMinutes: 1440
          })
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Authentication failed"
        });
      }
    }).catch(function(err) {
      res.status(500).json({
        success: false,
        message: "Error occurred:" + err
      });
    });
  };

  return {
    login: login
  }
}

module.exports = authenticationController;
