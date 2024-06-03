'use client'

import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Image, Upload, GetProp, UploadProps, UploadFile } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MessageType } from '@/app/util/Message';
import { Category } from '@/app/model/HomeModel';

interface CategoryItemProps {
    isModalOpen: boolean,
    editingCategory: Category,
    onClickCloseModal: () => void
    getCategoryList: () => void
    showMessage: (messageType: MessageType, content: string) => void
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const CategoryItem: React.FC<CategoryItemProps> = (
    { isModalOpen, editingCategory, onClickCloseModal, getCategoryList, showMessage }
) => {

    const [category, setCategory] = useState<Category>(new Category());

    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * HANDLE Save category
     */

    useEffect(() => {
        setCategory(editingCategory);
        if (editingCategory.imageUrl) {
            const currentFileList = [{
                uid: 'current_image',
                name: 'current_image',
                url: editingCategory.imageUrl
            }]
            setFileList(currentFileList);
        }
        return () => {
            setCategory(new Category());
            setPreviewOpen(false);
            setFileList([]);
            setPreviewImage('');
        }
    }, [isModalOpen, editingCategory]);

    const onSaveCategory = async () => {
        setIsLoading(true);
        const formData = new FormData();
        if (category.id === undefined) {
            fileList.forEach(file => {
                formData.append('file', file.originFileObj as FileType);
            })
            formData.append('category', JSON.stringify(category));
            const response = await fetch('/api/category', { method: 'POST', body: formData })
            if (response.ok) {
                getCategoryList();
                showMessage(MessageType.SUCCESS, 'Đã lưu phân loại sản phẩm thành công');
                onCancelModal();
            } else {
                console.log(response);
            }
        } else {
            category.imageUrl = undefined
            fileList.forEach(file => {
                if (file.url === undefined) {
                    formData.append('file', file.originFileObj as FileType);
                    category.imageUrl = undefined
                }
            });
            formData.append('category', JSON.stringify(category));
            const response = await fetch('/api/category', { method: 'POST', body: formData })
            if (response.ok) {
                getCategoryList();
                showMessage(MessageType.SUCCESS, 'Đã lưu phân loại sản phẩm thành công');
                onCancelModal();
            } else {
                console.log(response);
            }
        }
        setIsLoading(false);
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
     * HANDLE Upload image
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

    const handleRemoveImage = (_: UploadFile<any>) => {
        setFileList([]);
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <Modal
            title={editingCategory.id ? 'Phân loại ' + editingCategory.id : 'Thêm phân loại sản phẩm'}
            open={isModalOpen}
            onOk={onSaveCategory}
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
                <Form.Item label="Tên phân loại">
                    <Input value={category.name} onChange={(event) => {
                        setCategory(prevCategory => ({
                            ...prevCategory,
                            name: event.currentTarget.value,
                            code: convertNameToCode(event.currentTarget.value)
                        }));
                    }} />
                </Form.Item>
                <Form.Item label="Mã phân loại">
                    <Input disabled={true} value={category.code} />
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChangeUpload}
                        onPreview={handlePreviewImage}
                        onRemove={handleRemoveImage}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
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

export default CategoryItem;