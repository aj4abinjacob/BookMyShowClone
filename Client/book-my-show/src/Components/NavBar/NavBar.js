import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

function NavBar() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout
    }
  ];

  const items = [
    { 
      key: 'user', 
      label: (
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <div style={{ color: 'white', cursor: 'pointer' }}>
            <UserOutlined /> {userName}
          </div>
        </Dropdown>
      )
    },
    { key: 'home', label: <Link to="/">Home</Link> },
  ];

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <h3 style={{ color: 'white', margin: 0, flex: 'none', marginRight: '20px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Book My Show</Link>
        </h3>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            items={items}
            style={{ marginLeft: 'auto' }}
          />
        </div>
      </Header>
    </Layout>
  );
}

export default NavBar;
