'use client'

import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { DashboardOutlined, ProductOutlined, BarChartOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';

const { Header, Sider, Content } = Layout;

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <div style={{ color: 'white', textAlign: 'center', padding: '25px 0', fontWeight: 'bold', fontSize: '16px' }}>
                    DASHBOARD
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[pathname]}
                    openKeys={['product-management']} // Ensure this submenu is always open
                    items={[
                        {
                            key: '/home/dashboard',
                            icon: <DashboardOutlined />,
                            label: 'Dashboard',
                            onClick: () => router.push('/home/dashboard'),
                        },
                        {
                            key: 'product-management',
                            icon: <ProductOutlined />,
                            label: 'Sản phẩm',
                            children: [
                                {
                                    key: '/home/category',
                                    label: 'Phân loại',
                                    onClick: () => router.push('/home/category'),
                                },
                                {
                                    key: '/home/product',
                                    label: 'Danh sách',
                                    onClick: () => router.push('/home/product'),
                                },
                            ],
                        },
                        {
                            key: '/home/statistic',
                            icon: <BarChartOutlined />,
                            label: 'Thống kê doanh thu',
                            onClick: () => router.push('/home/statistic'),
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: '#fff' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <div
                    style={{
                        overflowY: 'auto',
                        height: 'calc(100vh - 64px)', 
                    }}
                >
                    <Content
                        style={{
                            padding: 24,
                            minHeight: 280,
                            borderRadius: '8px',
                        }}
                    >
                        {children}
                    </Content>
                </div>
            </Layout>
        </Layout>
    );
}

export default HomeLayout;