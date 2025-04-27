const User = require("../Models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        console.log("User logged in successfully:", user);
        var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            algorithm: "HS256"
        });
        console.log("Generated JWT token:", token);


        return res.status(200).json({ message: "User logged in successfully",  success: true, token: token, user: { id: user._id, name: user.name, email: user.email } });
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

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hashSync(password, salt);

        

        // console.log("Hashed password:", hashedPassword); // Log the hashed password
        const newUser = new User(req.body);
        await newUser.save();
        console.log("User registered successfully:", newUser);
        return res.status(201).json({ message: "User registered successfully", user: newUser });
    }catch (error) {
        console.error("Error checking user existence:", error);
        return res.status(500).json({ message: "Server error" });
    }



    // res.json({ message: "Registration successful" }); // Add a response
  };



  const onForgetPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const otp = otpGenerator();
        console.log("Generated OTP:", otp);

        return res.status(200).json({ success: true, message: `Otp Sent Successfully on email id ${email}`});
    } catch (error) {
        console.error("Error sending password reset link:", error);
        return res.status(500).json({ message: "Server error" });
    }


  };


  function otpGenerator() {
    const otp = Math.floor((10000 * Math.random()) + 90000);
    return otp;
  }


  
  module.exports = {
    onLogin,
    onRegister,
    onForgetPassword
  };