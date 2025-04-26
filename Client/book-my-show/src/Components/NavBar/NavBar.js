import React from 'react';
import { Breadcrumb, Layout, Menu, theme, Input } from 'antd';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

function NavBar() {
  const items = [
    { key: 'user', label: 'User' },
    { key: 'home', label: 'Home' },
  ];

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <h3 style={{ color: 'white', margin: 0, flex: 'none', marginRight: '20px' }}>Book My Show</h3>

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
