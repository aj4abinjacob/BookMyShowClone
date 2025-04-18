const onLogin = (req, res) => {
    console.log("Login request received");
    res.json({ message: "Login successful" }); // Add a response
  };
  
  const onRegister = (req, res) => {
    console.log("Register request received");
    res.json({ message: "Registration successful" }); // Add a response
  };
  
  module.exports = {
    onLogin,
    onRegister
  };