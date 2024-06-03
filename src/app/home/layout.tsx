'use client'

import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { DashboardOutlined, ProductOutlined, BarChartOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const { Header, Sider, Content } = Layout;

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<string>('')
    const pathname = usePathname()

    useEffect(() => {
        console.log(pathname)
        setSelectedMenu(pathname !== '/home' ? pathname : '/home/dashboard')
    }, [])

    const onClickMenu = (menuInfo: any) => {
        setSelectedMenu(menuInfo.key)
    }

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider trigger={null} >
                <div className="demo-logo-vertical" />
                <div style={{ color: 'white', textAlign: 'center', padding: '25px 0', fontWeight: 'bold', fontSize: '16px' }}>
                    DASHBOARD
                </div>
                <Menu
                    mode="inline"
                    theme='dark'
                    selectedKeys={[selectedMenu]}
                    items={[
                        {
                            key: '/home/dashboard',
                            icon: <DashboardOutlined />,
                            label: <Link href="/home/dashboard">Dashboard</Link>,
                            onClick: onClickMenu
                        },
                        {
                            key: 'product-management',
                            icon: <ProductOutlined />,
                            label: 'Sản phẩm',
                            children: [
                                {
                                    key: '/home/category',
                                    label: <Link href="/home/category">Phân loại</Link>,
                                    onClick: onClickMenu
                                },
                                {
                                    key: '/home/product',
                                    label: <Link href="/home/product">Danh sách</Link>,
                                    onClick: onClickMenu
                                },
                            ],
                        },
                        {
                            key: '/home/statistic',
                            icon: <BarChartOutlined />,
                            label: <Link href="/home/statistic">Thống kê doanh thu</Link>,
                            onClick: onClickMenu
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