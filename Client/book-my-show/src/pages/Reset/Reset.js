import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Input, Form, Button, Card, Typography } from 'antd';
import { ResetPassword as resetPasswordApi } from '../../calls/user';
import { message } from 'antd';

const { Title } = Typography;

const ResetPassword = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Extract email from URL parameters
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    
    if (!emailParam) {
      // Redirect to forgot password if no email parameter is found
      messageApi.error("Email is required. Please start from the forget password page.");
      navigate('/forget');
      return;
    }
    
    setEmail(emailParam);
  }, [location, navigate, messageApi]);

  const onReset = async (values) => {
    // Add email to the form values
    const resetData = {
      ...values,
      email: email
    };
    
    try {
      const response = await resetPasswordApi(resetData);
      if (response.data.success) {
        messageApi.success(response.data.message);
        // Redirect to login page after successful reset
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        messageApi.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      messageApi.error("Failed to reset password. Please try again.");
    }
  };

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
            Reset Password
          </Title>
        </div>
        <div style={{ padding: '24px 0' }}>
          {email && (
            <p style={{ textAlign: 'center', marginBottom: '16px' }}>
              Resetting password for: <strong>{email}</strong>
            </p>
          )}
          <Form
            name="book-my-show-reset-password"
            layout="vertical"
            requiredMark={false}
            form={form}
            onFinish={onReset}
          >
            <Form.Item
              label="OTP"
              htmlFor="otp"
              name="otp"
              className="d-block"
              rules={[
                { required: true, message: "OTP is required" },
                { min: 5, max: 5, message: 'OTP must be 5 digits' }
              ]}
            >
              <Input
                id="otp"
                placeholder="Enter OTP sent to your email"
              />
            </Form.Item>

            <Form.Item
              label="New Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[
                { required: true, message: "Password is required" },
                { min: 8, message: 'Password must be at least 8 characters' }
              ]}
            >
              <Input.Password
                id="password"
                placeholder="Enter new password"
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              htmlFor="confirmPassword"
              name="confirmPassword"
              className="d-block"
              dependencies={['password']}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password
                id="confirmPassword"
                placeholder="Confirm new password"
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
                Reset Password
              </Button>
            </Form.Item>
          </Form>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <p>
              New User? <Link to="/register" style={{ color: '#e23744' }}>Register Here</Link>
            </p>
            <p>
              Forgot Password? <Link to="/forgot" style={{ color: '#e23744' }}>Click Here</Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResetPassword;