'use client'

import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Select, Space, Table, message } from 'antd';
import type { TableProps } from 'antd';
import { deleteProductById, getAllCategory, getProductByCategoryId } from './api/route';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { MessageType, showMessage } from '@/app/util/Message';
import ProductItem from './ProductItem';

export class Product {
  key?: number;
  id?: number;
  name?: string;
  code?: string;
  description?: string;
  unitPrice?: number;
  quantity?: number;
  categoryId?: number;
  images?: string[];
}

export interface Category {
  id: number;
  name: string;
  code: string;
}

const ProductDashboard: React.FC = () => {

  const [messageApi, contextHolder] = message.useMessage();

  const [productList, setProductList] = useState<Product[]>([]);

  const [categoryId, setCategoryId] = useState<number>(0);
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
    getAllCategory().then(response => {
      if (response.success) {
        const categoryListResponse: Category[] = response.data.categoryList
        setCategoryList(categoryListResponse)
        setCategoryId(categoryListResponse[0].id)
      }
    })
  }, [])

  useEffect(() => {
    getProductList()
  }, [categoryId])

  const getProductList = () => getProductByCategoryId(categoryId).then(response => {
    if (response.success) {
      const productResponseList: Product[] = response.data.productResponseList
      productResponseList.forEach(productResponse => productResponse.key = productResponse.id)
      setProductList(productResponseList)
    }
  });

  const onSelectCategory = (value: number) => {
    setCategoryId(value);
  }

  const onClickDeleteProduct = (id: number) => deleteProductById(id).then(response => {
    if (response.success) {
      getProductList();
      showMessage(messageApi, MessageType.SUCCESS, 'Đã xóa sản phẩm thành công');
    } else {
      showMessage(messageApi, MessageType.ERROR, 'Xóa sản phẩm thất bại');
    }
  })

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

  return <>
    {contextHolder}
    <ProductItem categoryList={categoryList}
      isModalOpen={isModalOpen}
      editingProduct={editingProduct}
      onClickCloseModal={onClickCloseProductItem} />
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