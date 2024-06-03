'use client'

import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Select, Space, Table, message } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { MessageType, showMessage } from '@/app/util/Message';
import ProductItem from './ProductItem';
import { Category, Product } from '@/app/model/HomeModel';

const ProductDashboard: React.FC = () => {

  const [messageApi, contextHolder] = message.useMessage();

  const [productList, setProductList] = useState<Product[]>([]);

  const [categoryId, setCategoryId] = useState<number>(1);
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [editingProduct, setEditingProduct] = useState<Product>(new Product())

  const columns: TableProps<Product>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: '',
      render: (_, record) => (
        <Space>
          <Button type="primary"
            shape="circle" icon={<EditOutlined />}
            onClick={() => onClickEditProduct(record)} />
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc chắn muốn xóa sản phẩm này ?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            placement="topLeft"
            onConfirm={() => onClickDeleteProduct(record.id!!)}
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
    getAllCategory();
  }, [])

  useEffect(() => {
    getProductList()
  }, [categoryId])

  const getAllCategory = async () => {
    const response = await fetch('/api/category', { method: 'GET' })
    if (response.ok) {
      const responseJson = await response.json();
      const categoryListResponse: Category[] = responseJson.data.categoryList
      setCategoryList(categoryListResponse)
      setCategoryId(categoryListResponse[0].id!!)
    }
  }

  const getProductList = async () => {
    const response = await fetch(`/api/product?categoryId=${categoryId}`, { method: 'GET' })
    if (response.ok) {
      const responseJson = await response.json();
      const productResponseList: Product[] = responseJson.data.productResponseList
      productResponseList.forEach(productResponse => productResponse.key = productResponse.id)
      setProductList(productResponseList)
    }
  }

  const onSelectCategory = (value: number) => {
    setCategoryId(value);
  }

  const onClickDeleteProduct = async (id: number) => {
    const response = await fetch(`/api/product?id=${id}`, { method: 'DELETE' })
    if (response.ok) {
      getProductList();
      showMessage(messageApi, MessageType.SUCCESS, 'Đã xóa sản phẩm thành công');
    } else {
      showMessage(messageApi, MessageType.ERROR, 'Xóa sản phẩm thất bại');
    }
  }

  const onClickAddProduct = () => {
    setIsModalOpen(true);
    setEditingProduct(new Product());
  }

  const onClickEditProduct = (product: Product) => {
    setIsModalOpen(true);
    setEditingProduct(product);
  }

  const onClickCloseProductItem = () => {
    setIsModalOpen(false);
    setEditingProduct(new Product());
  }

  const showMessageFromModal = (messageType: MessageType, content: string) => {
    showMessage(messageApi, messageType, content);
  }

  return <>
    {contextHolder}
    <ProductItem categoryList={categoryList}
      isModalOpen={isModalOpen}
      editingProduct={editingProduct}
      onClickCloseModal={onClickCloseProductItem}
      getProductList={getProductList}
      showMessage={showMessageFromModal} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
      <Select
        value={categoryId}
        style={{ width: 120 }}
        onSelect={onSelectCategory}
        options={categoryList.map(category => ({
          value: category.id,
          label: category.name,
        }))}
      />
      <Button type="primary" onClick={() => onClickAddProduct()}>Thêm sản phẩm</Button>
    </div>
    <Table columns={columns} dataSource={productList} pagination={{ pageSize: 8 }} />
  </>;
}

export default ProductDashboard;