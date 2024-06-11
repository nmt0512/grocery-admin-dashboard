'use client'

import { Pie } from "@ant-design/charts";
import { AppstoreOutlined, DatabaseOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";

interface BestSellingProduct {
    name: string,
    quantity: number
}

const Dashboard = () => {

    const [numberOfCategory, setNumberOfCategory] = useState<number>(0);
    const [numberOfProduct, setNumberOfProduct] = useState<number>(0);
    const [bestSellingProductList, setBestSellingProductList] = useState<BestSellingProduct[]>([])

    useEffect(() => {
        getNumberOfCategory();
        getNumberOfProduct();
        getBestSellingProductList();
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

    const getBestSellingProductList = async () => {
        const response = await fetch(`/api/product/bestSelling`, { method: 'GET' })
        if (response.ok) {
            const responseJson = await response.json();
            const bestSellingProductList: BestSellingProduct[] = responseJson.data.bestSellingProductResponseList;
            console.log(bestSellingProductList);
            setBestSellingProductList(bestSellingProductList);
        }
    }

    return <div>
        <Row gutter={16}>
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
        <div style={{ marginTop: 20, marginBottom: 20, fontSize: 16, fontWeight: 'bold' }}>
            Sản phẩm bán chạy 30 ngày qua
        </div>
        <Pie angleField={'quantity'}
            colorField={'name'}
            data={bestSellingProductList}
            label={{
                text: (data: BestSellingProduct) => data.quantity,
                style: {
                    fontWeight: 'bold',
                    fontSize: 16
                },
            }}
            legend={{
                color: {
                    title: false,
                    position: 'right',
                    rowPadding: 5,
                }
            }}
            tooltip={{
                title: (data: BestSellingProduct) => data.name,
                items: [{
                    name: 'Số lần xuất hiện trong các đơn hàng',
                    field: 'quantity',
                }]
            }} />
    </div>
}

export default Dashboard;