import React from 'react';
import { Link } from "react-router-dom";
import { Input, Form, Button, Card, Typography, message } from 'antd';
import { LoginUser } from '../../calls/user'; 
const { Title } = Typography;

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const onLogin = async (values) => {
    try {
      const response = await LoginUser(values);
      console.log("Response from LoginUser:", response);
      if (response.status === 200) {
        messageApi.success("Login successful!");
        console.log("User logged in successfully:", response.data);
        // Redirect to home page or show success message
      }
      else {
        messageApi.error("Login failed. Please try again.");
        console.error("Error logging in user:", response.data);
        // Show error message
      }
    } catch (error) {
      messageApi.error("An error occurred during login.");
      console.error("Login error:", error);
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
        {/* Header Section with the Book My Show branding */}
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
            Login to Book My Show
          </Title>
        </div>
        
        {/* Form Section using Ant Design components */}
        <div style={{ padding: '24px 0' }}>
          <Form
            name="book-my-show-login"
            layout="vertical"
            requiredMark={false}
            onFinish={onLogin}
          >
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[{ required: true, message: "Email is required" }, { type: 'email', message: 'Please enter a valid email' }]}
            >
              <Input
                id="email"
                type="email"
                placeholder="Enter your Email"
              />
            </Form.Item>
            
            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password
                id="password"
                placeholder="Enter your Password"
              />
            </Form.Item>
            
            <Form.Item className="d-block">
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ 
                  backgroundColor: '#e23744', 
                  fontSize: "1rem", 
                  fontWeight: "600" 
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <p>
              New User? <Link to="/register" style={{ color: '#e23744' }}>Register Here</Link>
            </p>
            <p>
              Forget Password? <Link to="/forget" style={{ color: '#e23744' }}>Click Here</Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;