'use client'

import { AppstoreOutlined, DatabaseOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import { getNumberOfCategory, getNumberOfProduct } from "./api/route";

const Dashboard = () => {

    const [numberOfCategory, setNumberOfCategory] = useState<number>(0);
    const [numberOfProduct, setNumberOfProduct] = useState<number>(0);

    useEffect(() => {
        getNumberOfCategory().then(response => {
            if (response.success) {
                const numberOfCategoryResponse: number = response.data.numberOfCategory;
                setNumberOfCategory(numberOfCategoryResponse);
            }
        })
        getNumberOfProduct().then(response => {
            if (response.success) {
                const numberOfProductResponse: number = response.data.numberOfProduct;
                setNumberOfProduct(numberOfProductResponse);
            }
        })
    }, [])

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