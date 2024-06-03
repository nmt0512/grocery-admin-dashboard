'use client'

import { AppstoreOutlined, DatabaseOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";

const Dashboard = () => {

    const [numberOfCategory, setNumberOfCategory] = useState<number>(0);
    const [numberOfProduct, setNumberOfProduct] = useState<number>(0);

    useEffect(() => {
        getNumberOfCategory();
        getNumberOfProduct();
    }, [])

    const getNumberOfCategory = async () => {
        const response = await fetch(`/api/category/numberOfCategory`, { method: 'GET' })
        if (response.ok) {
            const responseJson = await response.json();
            const numberOfCategoryResponse: number = responseJson.data.numberOfCategory;
            setNumberOfCategory(numberOfCategoryResponse);
        }
    }

    const getNumberOfProduct = async () => {
        const response = await fetch(`/api/product/numberOfProduct`, { method: 'GET' })
        if (response.ok) {
            const responseJson = await response.json();
            const numberOfProductResponse: number = responseJson.data.numberOfProduct;
            setNumberOfProduct(numberOfProductResponse);
        }
    }

    return <Row gutter={16}>
        <Col span={12}>
            <Card bordered={false}>
                <Statistic
                    title="Tổng số phân loại sản phẩm"
                    value={numberOfCategory}
                    prefix={<DatabaseOutlined />}
                />
            </Card>
        </Col>
        <Col span={12}>
            <Card bordered={false}>
                <Statistic
                    title="Tổng số sản phẩm"
                    value={numberOfProduct}
                    prefix={<AppstoreOutlined />}
                />
            </Card>
        </Col>
    </Row>
}

export default Dashboard;