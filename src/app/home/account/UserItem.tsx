'use client'

import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { MessageType } from '@/app/util/Message';
import { User, UserRoles } from '@/app/model/HomeModel';

interface UserItemProps {
    roleList: string[],
    isModalOpen: boolean,
    editingUser: User,
    onClickCloseModal: () => void
    getUserList: () => void
    showMessage: (messageType: MessageType, content: string) => void
}

const UserItem: React.FC<UserItemProps> = (
    { roleList, isModalOpen, editingUser, onClickCloseModal, getUserList, showMessage }
) => {

    const [user, setUser] = useState<User>(new User());
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * HANDLE Save user
     */

    useEffect(() => {
        if (editingUser.role === undefined) {
            editingUser.role = roleList.length > 0 ? roleList[0] : ''
        }
        setUser(editingUser);
        return () => {
            setUser(new User());
        }
    }, [isModalOpen, editingUser, roleList]);

    const onSaveUser = async () => {
        setIsLoading(true);

        if (isNotEmpty(user.role)
            && isNotEmpty(user.username)
            && isNotEmpty(user.password)
            && isNotEmpty(user.email)
            && isNotEmpty(user.firstName)
            && isNotEmpty(user.lastName)) {
            const response = editingUser.id === undefined
                ?
                await fetch('/api/user', { method: 'POST', body: JSON.stringify(user) })
                :
                await fetch('/api/user', { method: 'PUT', body: JSON.stringify(user) })
            if (response.ok) {
                getUserList();
                showMessage(MessageType.SUCCESS, 'Đã lưu tài khoản thành công');
                onCancelModal();
            } else {
                showMessage(MessageType.ERROR, 'Tên tài khoản hoặc email đã tồn tại')
            }
        } else {
            showMessage(MessageType.ERROR, 'Bạn cần điền đầy đủ tất cả thông tin của Form')
        }
        setIsLoading(false);
    }

    const onCancelModal = () => {
        setUser(new User());
        onClickCloseModal();
    }

    const isNotEmpty = (value: string | undefined) => value !== undefined && value.trim().length > 0

    return (
        <Modal
            title={editingUser.id ? 'Tài khoản ' + editingUser.id : 'Thêm tài khoản'}
            open={isModalOpen}
            onOk={onSaveUser}
            centered
            onCancel={onCancelModal}
            confirmLoading={isLoading}
        >
            <Form
                layout="horizontal"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 25 }}
                labelAlign='left'
            >
                <Form.Item label="Vai trò">
                    <Select
                        value={user.role}
                        onSelect={(value) => {
                            setUser(prevProduct => ({
                                ...prevProduct,
                                role: value
                            }));
                        }}
                        options={roleList.map(role => ({
                            value: role,
                            label: role === UserRoles.CUSTOMER ? 'Khách hàng' : 'Nhân viên',
                        }))}
                    />
                </Form.Item>
                <Form.Item label="Tên tài khoản">
                    <Input disabled={editingUser.id !== undefined} value={user.username} onChange={(event) => {
                        setUser(prevUser => ({
                            ...prevUser,
                            username: event.currentTarget.value,
                        }));
                    }} />
                </Form.Item>
                <Form.Item
                    hidden={editingUser.id !== undefined}
                    label="Mật khẩu"
                    name="password"
                >
                    <Input.Password
                        autoComplete="off"
                        value={user.password}
                        onChange={(event) => {
                            setUser(prevUser => ({
                                ...prevUser,
                                password: event.currentTarget.value,
                            }));
                        }}
                    />
                </Form.Item>
                <Form.Item label="Email">
                    <Input value={user.email} onChange={(event) => {
                        setUser(prevUser => ({
                            ...prevUser,
                            email: event.currentTarget.value,
                        }));
                    }} />
                </Form.Item>
                <Form.Item label="Họ">
                    <Input value={user.firstName} onChange={(event) => {
                        setUser(prevUser => ({
                            ...prevUser,
                            firstName: event.currentTarget.value,
                        }));
                    }} />
                </Form.Item>
                <Form.Item label="Tên">
                    <Input value={user.lastName} onChange={(event) => {
                        setUser(prevUser => ({
                            ...prevUser,
                            lastName: event.currentTarget.value,
                        }));
                    }} />
                </Form.Item>
            </Form>
        </Modal>

    )
};

export default UserItem;