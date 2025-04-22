import React from 'react';
import { Link } from "react-router-dom";
import { Input, Form, Button, Card, Typography, message } from 'antd';
import { RegisterUser } from '../../calls/user';

const { Title } = Typography;



const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const onRegister = async (values) => {
    const response = await RegisterUser(values);
    console.log("Response from RegisterUser:", response);
    if (response.status === 201) {
      messageApi.success("Registration successful! Please login.");
      console.log("User registered successfully:", response.data);
      // Redirect to login page or show success message
    }
    else {
      messageApi.error("Registration failed. Please try again.");
      console.error("Error registering user:", response.data);
      // Show error message
    }
  }

  return (

    
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      {contextHolder}

      <Card className="shadow-md" style={{ width: '500px' }}>
        {/* Red header section like the one in Login, following the same login pattern*/}
        <div 
          style={{ 
            backgroundColor: '#e23744', 
            margin: '-24px -24px 0 -24px',
            padding: '16px',
            textAlign: 'center',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px'
          }}
        >
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            Register on Book My Show
          </Title>
        </div>
        
        {/* Form area */}
        <div style={{ padding: '24px 0' }}>
          <Form
            name="book-my-show-register"
            layout="vertical"
            requiredMark={false}
            onFinish={onRegister}
          >
            {/* Name field */}
            <Form.Item
              label="Name"
              name="name"
              className="d-block"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input
                placeholder="Enter your full name"
              />
            </Form.Item>
                        
            {/* Email field */}
            <Form.Item
              label="Email"
              name="email"
              className="d-block" 
              rules={[
                { required: true, message: "Email is required" },
                { type: 'email', message: 'Please enter a valid email address' }
              ]}
            >
              <Input
                type="email"
                placeholder="Enter your email address"
              />
            </Form.Item>
            
            {/* Password field */}
            <Form.Item
              label="Password"
              name="password"
              className="d-block"
              // forgot to add min length at first, added it later
              rules={[
                { required: true, message: "Password is required" },
                { min: 6, message: "Password must be at least 6 characters long" }
              ]}
            >
              <Input.Password
                placeholder="Create a password"
              />
            </Form.Item>
            
            {/* Register button */}
            <Form.Item className="d-block">
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ 
                  backgroundColor: '#e23744', 
                  fontSize: "1rem", 
                  fontWeight: "600",
                  // oops, margin not needed but left it here
                  marginTop: '8px'
                }}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          
          {/* Link to login page */}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <p>
              Already a user? <Link to="/login" style={{ color: '#e23744' }}>Login</Link>
            </p>
            {/* Left an extra empty paragraph by accident */}
            <p>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;