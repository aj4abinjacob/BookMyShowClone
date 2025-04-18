const User = require("../Models/user.model");

const onLogin = async(req, res) => {
    const {email, password} = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found. Please register!" });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        console.log("User logged in successfully:", user);
        return res.status(200).json({ message: "User logged in successfully", user });
    }
    catch (error) {
        console.error("Error checking user credentials:", error);
        return res.status(500).json({ message: "Server error" });
    }

  };
  
  const onRegister = async (req, res) => {
    // console.log("Register request received");
    // console.log("Request body:", req.body); // Log the request body
    
    const {name, email, password} = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        console.log("User registered successfully:", newUser);
        return res.status(201).json({ message: "User registered successfully", user: newUser });
    }catch (error) {
        console.error("Error checking user existence:", error);
        return res.status(500).json({ message: "Server error" });
    }



    // res.json({ message: "Registration successful" }); // Add a response
  };
  
  module.exports = {
    onLogin,
    onRegister
  };