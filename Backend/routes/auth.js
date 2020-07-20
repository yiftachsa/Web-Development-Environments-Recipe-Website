var express = require("express");
var router = express.Router();
const DButils = require("../modules/DButils");
const { RegisterValidationRules, validate } = require("../modules/validator");

const authentication_module = require("./utils/authentication");
const users_details_module = require("./utils/users_details");

router.post(
  "/register",
  RegisterValidationRules,
  validate,
  async (req, res, next) => {
    try {
      // parameters exists
      // valid parameters
      let params = extractRegistretionParams(req.body);
      // username exists
      let doesUserExists = await users_details_module.doesUsernameExists(
        params.username
      );
      if (doesUserExists) {
        throw {
          status: 409,
          message: "An existing user already exists with the given username",
        };
      }
      //if no error thrown then the username does not exist
      // add the new username
      let hash_password = await authentication_module.encryptPassword(
        params.password
      );
      params.hash_password = hash_password;

      users_details_module.addUserRecord(params);

      console.log(params.username + " was successfully registered");

      res
        .status(201)
        .send({ message: "user created successfully", success: true });
    } catch (error) {
      next(error);
    }
  }
);

function extractRegistretionParams(body) {
  let params = {};
  let parameters_names = [
    "username",
    "password",
    "firstName",
    "lastName",
    "country",
    "email",
    "photoLink",
  ];
  parameters_names.forEach((parameter_name) => {
    if (body[parameter_name]) {
      params[parameter_name] = body[parameter_name];
    } else {
      params[parameter_name] = null; //TODO: Check
    }
  });
  return params;
}

router.post("/login", async (req, res, next) => {
  try {
    // check that username exists
    let doesUserExists = await users_details_module.doesUsernameExists(
      req.body.username
    );
    if (!doesUserExists) {
      throw { status: 401, message: "Authentication failed" };
    }

    // check that the password is correct
    await authentication_module.authenticatePassword(
      req.body.username,
      req.body.password
    );

    // Set cookie
    req.session.user_id = await users_details_module.getUserId(
      req.body.username
    );
    
    //req.session.save();
    //res.cookie(session_options.cookieName, user.user_id, cookies_options);

    // return cookie
    res.status(200).send({ message: "login succeeded", success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", function (req, res) {
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.send({ success: true, message: "logout succeeded" });
});

module.exports = router;
