'use client'

import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, message } from 'antd';
import { TableProps, Image } from 'antd';
import { MessageType, showMessage } from '@/app/util/Message';
import CategoryItem from './CategoryItem';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Category } from '@/app/model/HomeModel';

const CategoryDashboard: React.FC = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [editingCategory, setEditingCategory] = useState<Category>(new Category());

    const columns: TableProps<Category>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Tên phân loại',
            dataIndex: 'name',
        },
        {
            title: 'Mã phân loại',
            dataIndex: 'code',
        },
        {
            title: 'Ảnh phân loại',
            render: (_, record) => (
                <Image alt='' width={80} src={record.imageUrl} />
            ),
        },
        {
            title: '',
            render: (_, record) => (
                <Space>
                    <Button type="primary"
                        shape="circle" icon={<EditOutlined />}
                        onClick={() => onClickEditCategory(record)} />
                    <Popconfirm
                        title="Xóa phân loại sản phẩm"
                        description="Tất cả những sản phẩm thuộc phân loại này sẽ bị xóa. 
                        Bạn có chắc chắn muốn xóa phân loại sản phẩm này ?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        placement="topLeft"
                        onConfirm={() => onClickDeleteCategory(record.id!!)}
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
        getCategoryList();
    }, [])

    const getCategoryList = async () => {
        const response = await fetch('/api/category', { method: 'GET' })
        if (response.ok) {
            const responseJson = await response.json();
            const categoryResponseList: Category[] = responseJson.data.categoryList;
            categoryResponseList.forEach(categoryResponse => categoryResponse.key = categoryResponse.id)
            setCategoryList(categoryResponseList);
        }
    }

    const onClickDeleteCategory = async (id: number) => {
        const response = await fetch(`/api/category?id=${id}`, { method: 'DELETE' })
        if (response.ok) {
            getCategoryList();
            showMessage(messageApi, MessageType.SUCCESS, 'Đã xóa phân loại sản phẩm thành công');
        } else {
            showMessage(messageApi, MessageType.ERROR, 'Xóa phân loại sản phẩm thất bại');
        }
    }

    const onClickAddCategory = () => {
        setIsModalOpen(true);
        setEditingCategory(new Category());
    }

    const onClickEditCategory = (category: Category) => {
        setIsModalOpen(true);
        setEditingCategory(category);
    }

    const onClickCloseCategoryItem = () => {
        setIsModalOpen(false);
        setEditingCategory(new Category());
    }

    const showMessageFromModal = (messageType: MessageType, content: string) => {
        showMessage(messageApi, messageType, content);
    }

    return <>
        {contextHolder}
        <CategoryItem
            isModalOpen={isModalOpen}
            editingCategory={editingCategory}
            onClickCloseModal={onClickCloseCategoryItem}
            getCategoryList={getCategoryList}
            showMessage={showMessageFromModal} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <Button type="primary" onClick={() => onClickAddCategory()}>Thêm phân loại</Button>
        </div>
        <Table columns={columns} dataSource={categoryList} pagination={{ pageSize: 8 }} />
    </>;
}

export default CategoryDashboard;