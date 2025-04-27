import React from 'react';
import { Link } from "react-router-dom";
import { Input, Form, Button, Card, Typography } from 'antd';
import { ForgotPassword } from '../../calls/user'; 


const { Title } = Typography;

const ForgetPassword = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <Card className="shadow-md" style={{ width: '500px' }}>
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
            Forget Password
          </Title>
        </div>
        
        <div style={{ padding: '24px 0' }}>
          <Form
            name="book-my-show-forgot-password"
            layout="vertical"
            requiredMark={false}
            onFinish={ForgotPassword}
          >
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[
                { required: true, message: "Email is required" }, 
                { type: 'email', message: 'Please enter a valid email' }
              ]}
              
            >
              <Input
                id="email"
                type="email"
                placeholder="Enter your Email"
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
                Send OTP
              </Button>
            </Form.Item>
          </Form>
          
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <p>
              Existing User? <Link to="/login" style={{ color: '#e23744' }}>Login Here</Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ForgetPassword;