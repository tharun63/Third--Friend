const express = require("express"); // it is used to execute some function when req is created at the server side
const router = express.Router();
const User = require("../models/user");
const UserSession = require("../models/userSession");

/*
 *SignUp
 */
router.get("/", function (req, res, next) {
  res.send("Welcome to ThirdFriend");
});

router.post("/api/account/signup", (req, res, next) => {
  const { body } = req;
  const { firstName, lastName, password } = body;
  let { email } = body;

  if (!firstName) {
    return res.send({
      success: false,
      message: "Error: First name can not be blank.",
    });
  }
  if (!lastName) {
    return res.send({
      success: false,
      message: "Error: Last name can not be blank.",
    });
  }
  if (!email) {
    return res.send({
      success: false,
      message: "Error: email can not be blank.",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: password can not be blank.",
    });
  }
  console.log("here");
  email = email.toLowerCase();

  //steps:
  //1. verify email doesnot exit
  //2. save

  User.find(
    {
      email: email,
    },
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server Error",
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error: Account already exist.",
        });
      }

      // save the new User
      const newUser = new User();

      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server Error ",
            err,
          });
        } else
          return res.send({
            success: true,
            message: "Signd Up successfully.",
          });
      });
    }
  );
});

router.post("/api/account/signin", (req, res, next) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;

  if (!email) {
    return res.send({
      success: false,
      message: "Error: email can not be blank.",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: password can not be blank.",
    });
  }

  email = email.toLowerCase();

  User.find(
    {
      email: email,
    },
    (err, Users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server Error",
        });
      } else if (Users.length != 1) {
        return res.send({
          success: false,
          message: "Error: email Id does not exist.",
        });
      }

      const user = Users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "Error: Invalid password",
        });
      }

      // otherwise correct user

      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server Error",
          });
        }
        return res.send({
          success: true,
          message: "Signd In successfuly.",
          token: doc._id,
        });
      });
    }
  );
});

router.get("/api/account/verify", (req, res, next) => {
  // get the token
  const { query } = req;
  const { token } = query;
  // ?token =test
  // verify the token is one of a kind and it's not deleted

  UserSession.find(
    {
      _id: token,
      isDeleted: false,
    },
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      }

      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: "Error: Invalid",
        });
      } else {
        return res.send({
          success: true,
          message: " verify done successfully",
        });
      }
    }
  );
});

router.get("/api/account/signout", (req, res, next) => {
  // get the token
  const { query } = req;
  const { token } = query;
  // ?token =test
  // verify the token is one of a kind and it's not deleted

  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false,
    },
    {
      $set: { isDeleted: true },
    },
    null,
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      }
      return res.send({
        success: true,
        message: "signout done successfully",
      });
    }
  );
});

module.exports = router;
