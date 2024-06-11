'use client'

import React, { useEffect, useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import { DashboardOutlined, ProductOutlined, BarChartOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const { Header, Sider, Content } = Layout;

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [loadingLogout, setLoadingLogout] = useState<boolean>()
    const [selectedMenu, setSelectedMenu] = useState<string>('')
    const [selectedHeader, setSelectedHeader] = useState<string>('')
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        console.log(pathname)
        setSelectedMenu(pathname !== '/home' ? pathname : '/home/dashboard')
    }, [])

    const onClickMenu = (menuInfo: any) => {
        setSelectedMenu(menuInfo.key)
        let header: string
        if (menuInfo.key === '/home/category') {
            header = 'Danh sách phân loại'
        } else if (menuInfo.key === '/home/product') {
            header = 'Danh sách sản phẩm'
        } else if (menuInfo.key === '/home/account') {
            header = 'Danh sách tài khoản'
        } else if (menuInfo.key === '/home/statistic') {
            header = 'Thống kê doanh thu'
        } else {
            header = ''
        }
        setSelectedHeader(header)
    }

    const onClickLogout = async () => {
        setLoadingLogout(true)
        await fetch('/api/logout', { method: 'POST' })
        router.push('/login')
        setLoadingLogout(false)
    }

    return <>
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
                            key: '/home/account',
                            icon: <UserOutlined />,
                            label: <Link href="/home/account">Tài khoản</Link>,
                            onClick: onClickMenu
                        },
                        {
                            key: '/home/statistic',
                            icon: <BarChartOutlined />,
                            label: <Link href="/home/statistic">Thống kê doanh thu</Link>,
                            onClick: onClickMenu
                        },
                        {
                            key: 'logout',
                            label: <Button type="link" icon={<LogoutOutlined />} loading={loadingLogout}>
                                Đăng xuất
                            </Button>,
                            style: { position: 'absolute', bottom: 10, },
                            onClick: onClickLogout
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>
                    {selectedHeader}
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
    </>

}

export default HomeLayout;