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
          <Search
            placeholder="Search Movies"
            onSearch={(value) => console.log(value)}
            style={{ maxWidth: 300, marginRight: 20 }}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            items={items}
            style={{ marginLeft: 'auto' }}
          />
        </div>
      </Header>

      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: "black",
            minHeight: 280,
            padding: 24,
            borderRadius: "5px",
          }}
        >
          Content
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default NavBar;
