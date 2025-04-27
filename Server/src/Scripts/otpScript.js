
// for reset password
const otpScript =(name, email, otp) => {
    return `
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <h1>Hi ${name},</h1>
    <p>We received a request to reset your password.</p>
    <p>Your OTP is: <strong>${otp}</strong></p>
    <p>If you did not request this, please ignore this email.</p>
    <p>Thank you!</p>
</Body>
</html>
`
}

module.exports = otpScript;