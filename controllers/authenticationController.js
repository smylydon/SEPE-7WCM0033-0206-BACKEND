var jwt = require("jsonwebtoken");

var authenticationController = function(User) {

  var authenticatePost = function(req, res) {
    var user = req.user;
    if (user) {
      res.status(200).json({
        type: true,
        data: user,
        token: user.token
      });
    } else {
      res.status(400).json({
        type: false,
        data: "Incorrect email/password"
      });
    }
  };

  var signinPost = function(req, res) {
    var user = req.user;
    if (user) {
      res.status(400).json({
        type: false,
        data: "User alreay exists!"
      });
    } else {
      var userModel = new User();
      userModel.email = req.body.email;
      userModel.password = req.body.password;
      userModel.save(function(err, user) {
        user.token = jwt.sign(user, process.env.JWT_SECRET);
        user.save(function(err, user1) {
          res.status(201).json({
            type: true,
            data: user1,
            token: user1.token
          });
        });
      });
    }
  };


  var getMe = function(req, res) {
    console.log('------------------ getMe');
    User.findOne({
      token: req.token
    }, function(err, user) {
      if (err) {
        res.status(500).json({
          type: false,
          data: "Error occurred: " + err
        });
      } else {
        res.status(200).json({
          type: true,
          data: user
        });
      }
    });
  };
  console.log('got controllers');
  return {
    authenticatePost: authenticatePost,
    signinPost: signinPost,
    getMe: getMe
  }
}

module.exports = authenticationController;
