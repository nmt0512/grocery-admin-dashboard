'use client'

import React, { useEffect, useState } from 'react';
import { Category, Product } from './Product';
import { Form, Input, InputNumber, Modal, Select, Image, Upload, GetProp, UploadProps, UploadFile } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import { createProduct, updateProduct } from './api/route';
import { MessageType } from '@/app/util/Message';

interface ProductItemProps {
    categoryList: Category[],
    isModalOpen: boolean,
    editingProduct: Product,
    onClickCloseModal: () => void
    getProductList: () => Promise<void>
    showMessage: (messageType: MessageType, content: string) => void
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const ProductItem: React.FC<ProductItemProps> = (
    { categoryList, isModalOpen, editingProduct, onClickCloseModal, getProductList, showMessage }
) => {

    const [product, setProduct] = useState<Product>(new Product());

    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * HANDLE Save products
     */

    useEffect(() => {
        if (editingProduct.categoryId === undefined) {
            editingProduct.categoryId = categoryList.length > 0 ? categoryList[0].id : 0
        }
        setProduct(editingProduct);
        if (editingProduct.images && editingProduct.images.length > 0) {
            const currentFileList = editingProduct.images.map((imageUrl, index) => {
                return {
                    uid: index.toString(),
                    name: 'current_image',
                    url: imageUrl
                }
            })
            setFileList(currentFileList);
        }
        return () => {
            setProduct(new Product());
            setPreviewOpen(false);
            setFileList([]);
            setPreviewImage('');
        }
    }, [isModalOpen, editingProduct, categoryList]);

    const onSaveProduct = () => {
        setIsLoading(true);
        const formData = new FormData();
        if (product.id === undefined) {
            fileList.forEach(file => {
                formData.append('files', file.originFileObj as FileType);
            })
            formData.append('product', JSON.stringify(product));
            createProduct(formData).then(response => {
                if (response.success) {
                    getProductList();
                    showMessage(MessageType.SUCCESS, 'Đã lưu sản phẩm thành công');
                    onCancelModal();
                } else {
                    console.log(response);
                }
                setIsLoading(false);
            });
        } else {
            product.images = [];
            fileList.forEach(file => {
                if (file.url === undefined) {
                    formData.append('files', file.originFileObj as FileType);
                } else {
                    product.images.push(file.url);
                }
            });
            formData.append('product', JSON.stringify(product));
            console.log(product);
            updateProduct(formData).then(response => {
                if (response.success) {
                    getProductList();
                    showMessage(MessageType.SUCCESS, 'Đã lưu sản phẩm thành công');
                    onCancelModal();
                } else {
                    console.log(response);
                }
                setIsLoading(false);
            });
        }
    }

    const onCancelModal = () => {
        onClickCloseModal();
    }

    const convertNameToCode = (name: string): string => {
        return name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .toLowerCase()
            .replace(/\s+/g, '-');
    }

    /**
     * HANDLE Upload images
     */

    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handlePreviewImage = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChangeUpload: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    }

    const handleRemoveImage = (file: UploadFile<any>) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
            <Modal
                title={editingProduct.id ? 'Sản phẩm ' + editingProduct.id : 'Thêm sản phẩm'}
                open={isModalOpen}
                onOk={onSaveProduct}
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
                    <Form.Item label="Phân loại">
                        <Select
                            value={product.categoryId}
                            style={{ width: 120 }}
                            onSelect={(value) => {
                                setProduct(prevProduct => ({
                                    ...prevProduct,
                                    categoryId: value
                                }));
                            }}
                            options={categoryList.map(category => ({
                                value: category.id,
                                label: category.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="Tên sản phẩm">
                        <Input value={product.name} onChange={(event) => {
                            setProduct(prevProduct => ({
                                ...prevProduct,
                                name: event.currentTarget.value,
                                code: convertNameToCode(event.currentTarget.value)
                            }));
                        }} />
                    </Form.Item>
                    <Form.Item label="Mã sản phẩm">
                        <Input disabled={true} value={product.code} />
                    </Form.Item>
                    <Form.Item label="Đơn giá">
                        <InputNumber value={product.unitPrice} onChange={(value) => {
                            setProduct(prevProduct => ({
                                ...prevProduct,
                                unitPrice: value ?? 0
                            }));
                        }} />
                    </Form.Item>
                    <Form.Item label="Số lượng">
                        <InputNumber value={product.quantity} onChange={(value) => {
                            setProduct(prevProduct => ({
                                ...prevProduct,
                                quantity: value ?? 0
                            }));
                        }} />
                    </Form.Item>
                    <Form.Item label="Mô tả sản phẩm">
                        <TextArea rows={6} value={product.description} onChange={(event) => {
                            setProduct(prevProduct => ({
                                ...prevProduct,
                                description: event.currentTarget.value
                            }));
                        }} />
                    </Form.Item>
                    <Form.Item label="Hình ảnh">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleChangeUpload}
                            onPreview={handlePreviewImage}
                            onRemove={handleRemoveImage}
                        >
                            {fileList.length >= 5 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                                alt=''
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Form.Item>
                </Form>
            </Modal>

    )
};

export default ProductItem;