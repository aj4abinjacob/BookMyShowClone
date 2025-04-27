// This file contains the controller functions for handling authentication requests
const { onRegister, onLogin, onForgetPassword, onResetPassword } = require("../Controllers/auth.controllers");

module.exports = (app) => {
  app.post("/register", onRegister);
  app.post("/login", onLogin);
  app.post("/forget", onForgetPassword);
  app.post("/reset", onResetPassword);
};
