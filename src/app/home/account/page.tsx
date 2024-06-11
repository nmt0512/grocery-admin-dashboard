'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Button, Popconfirm, Select, Space, Table, message } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { MessageType, showMessage } from '@/app/util/Message';
import { User, UserRoles } from '@/app/model/HomeModel';
import UserItem from './UserItem';

const UserDashboard: React.FC = () => {

    const roleList = useRef<string[]>([
        UserRoles.CUSTOMER,
        UserRoles.STAFF
    ])

    const [messageApi, contextHolder] = message.useMessage();

    const [userList, setUserList] = useState<User[]>([]);

    const [role, setRole] = useState<string>(UserRoles.CUSTOMER);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [editingUser, setEditingUser] = useState<User>(new User())

    const columns: TableProps<User>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Họ',
            dataIndex: 'firstName',
        },
        {
            title: 'Tên',
            dataIndex: 'lastName',
        },
        {
            title: '',
            render: (_, record) => (
                <Space>
                    <Button type="primary"
                        shape="circle" icon={<EditOutlined />}
                        onClick={() => {
                            console.log(record)
                            onClickEditUser(record)
                        }} />
                    <Popconfirm
                        title="Xóa tài khoản"
                        description="Bạn có chắc chắn muốn xóa tài khoản này ?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        placement="topLeft"
                        onConfirm={() => onClickDeleteUser(record.id!!)}
                    >
                        <Button type="primary"
                            shape="circle"
                            icon={<DeleteOutlined />}
                            danger />
                    </Popconfirm>
                </Space>
            ),
        }
    ];

    useEffect(() => {
        getUserList()
    }, [role])

    const getUserList = async () => {
        const response = await fetch(`/api/user?role=${role}`, { method: 'GET' })
        if (response.ok) {
            const responseJson = await response.json();
            const userResponseList: User[] = responseJson.data.userResponseList
            userResponseList.forEach(userResponse => userResponse.key = userResponse.id)
            setUserList(userResponseList)
        }
    }

    const onSelectRole = (value: string) => {
        setRole(value);
    }

    const onClickDeleteUser = async (id: string) => {
        const response = await fetch(`/api/user?id=${id}`, { method: 'DELETE' })
        if (response.ok) {
            getUserList();
            showMessage(messageApi, MessageType.SUCCESS, 'Đã xóa tài khoản thành công');
        } else {
            showMessage(messageApi, MessageType.ERROR, 'Xóa tài khoản thất bại');
        }
    }

    const onClickAddUser = () => {
        setIsModalOpen(true);
        setEditingUser(new User())
    }

    const onClickEditUser = (user: User) => {
        setIsModalOpen(true);
        setEditingUser(user);
    }

    const onClickCloseUserItem = () => {
        setIsModalOpen(false);
        setEditingUser(new User())
    }

    const showMessageFromModal = (messageType: MessageType, content: string) => {
        showMessage(messageApi, messageType, content);
    }

    return <>
        {contextHolder}
        <UserItem roleList={roleList.current}
            isModalOpen={isModalOpen}
            editingUser={editingUser}
            onClickCloseModal={onClickCloseUserItem}
            getUserList={getUserList}
            showMessage={showMessageFromModal} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <Select
                style={{ width: '150px' }}
                value={role}
                onSelect={onSelectRole}
                options={roleList.current.map(role => ({
                    value: role,
                    label: role === UserRoles.CUSTOMER ? 'Khách hàng' : 'Nhân viên',
                }))}
            />
            <Button type="primary" onClick={() => onClickAddUser()}>Thêm tài khoản</Button>
        </div>
        <Table columns={columns} dataSource={userList} pagination={{ pageSize: 8 }} />
    </>;
}

export default UserDashboard;