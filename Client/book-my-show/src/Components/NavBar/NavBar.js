import React from 'react';
import {  Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

function NavBar() {
  const items = [
    { key: 'user', label: 'User' },
    { key: 'home', label: <Link to="/">Home</Link>  },
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
