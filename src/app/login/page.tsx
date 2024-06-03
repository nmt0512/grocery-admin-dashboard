'use client'

import { Avatar, Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Title } = Typography;

const Login: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const onLogin = async (value: any) => {
        setLoading(true)
        const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify(value) })
        if (response.ok) {
            router.push('/home/dashboard');
        } else {
            console.log(response);
        }
        setLoading(false)
    }

    return (
        <div className="Login"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "white"
            }}
        >
            <div style={{ maxWidth: 300 }}>
                <div style={{ position: 'relative', textAlign: 'center', marginBottom: 25 }}>
                    <Avatar
                        shape="square"
                        size={40}
                        src="https://res.cloudinary.com/dtcdff7yy/image/upload/v1716396937/grocery_store_icon_ex17ft.png"
                        style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)' }}
                    />
                    <Title level={3} style={{ margin: 0 }}>
                        Grocery
                    </Title>
                </div>
                <Form name="login" onFinish={onLogin}>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Tên đăng nhập"
                            autoComplete="off"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Mật khẩu"
                            autoComplete="off"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit" block>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login;