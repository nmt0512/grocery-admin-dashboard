'use client'

import { Column, Line } from "@ant-design/charts";
import { Col, DatePicker, Divider, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { Statistic } from "@/app/model/HomeModel";
import dayjs, { Dayjs } from "dayjs";

const StatisticDashboard = () => {

    const [year, setYear] = useState<number>(0);
    const [yearList, setYearList] = useState<number[]>([]);
    const [dailyStatisticList, setDailyStatisticList] = useState<Statistic[]>([]);
    const [monthlyStatisticList, setMonthlyStatisticList] = useState<Statistic[]>([]);
    const [yearlyStatisticList, setYearlyStatisticList] = useState<Statistic[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>('');

    const onSelectYear = (value: number) => {
        setYear(value);
    }

    useEffect(() => {
        getAllStatisticYear();
        getYearlyStatistic();
    }, []);

    useEffect(() => {
        getMonthlyStatisticByYear();
    }, [year])

    useEffect(() => {
        if (selectedMonth !== '') {
            getDailyStatisticByMonth();
        } else {
            setSelectedMonth(getCurrentMonthFormatted());
        }
    }, [selectedMonth])

    const getAllStatisticYear = async () => {
        const response = await fetch('/api/statistic/year', { method: 'GET' })
        if (response.ok) {
            const responseJson = await response.json();
            const yearListResponse: number[] = responseJson.data.yearList;
            setYearList(yearListResponse);
            setYear(yearListResponse[0]);
        }
    }

    const getYearlyStatistic = async () => {
        const response = await fetch('/api/statistic/yearly', { method: 'GET' })
        if (response.ok) {
            const responseJson = await response.json();
            const statisticResponseList: Statistic[] = responseJson.data.statisticResponseList;
            const firstStatisticResponse = statisticResponseList[0];
            const lastStatisticResponse = statisticResponseList[statisticResponseList.length - 1];

            const statisticResponseData: Statistic[] = [
                {
                    time: (Number(firstStatisticResponse.time) - 1).toString(),
                    revenue: 0
                },
                ...statisticResponseList,
                {
                    time: (Number(lastStatisticResponse.time) + 1).toString(),
                    revenue: 0
                }
            ]

            setYearlyStatisticList(statisticResponseData);
        }
    }

    const getCurrentMonthFormatted = (): string => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit'
        };
        const formattedDate = now.toLocaleDateString('en-GB', options);
        return formattedDate.replace('/', '-');
    };

    const getNumberOfDayInMonth = (year: number, month: number) => {
        const date = new Date(year, month, 0);
        return date.getDate();
    }

    const getDailyStatisticByMonth = async () => {
        const response = await fetch(`/api/statistic/daily?month=${selectedMonth}`, { method: 'GET' })
        if (response.ok) {
            const responseJson = await response.json();
            const statisticResponseList: Statistic[] = responseJson.data.statisticResponseList;

            const statisticResponseData: Statistic[] = [];

            const splitMonth = selectedMonth.split('-');
            const numberOfDay = getNumberOfDayInMonth(
                Number(splitMonth[1]),
                Number(splitMonth[0])
            )

            for (let i = 1; i <= numberOfDay; i++) {
                const statistic: Statistic | undefined = statisticResponseList.find(statisticResponse => {
                    return Number(statisticResponse.time) === i;
                })
                if (statistic === undefined) {
                    statisticResponseData.push({
                        time: i.toString(),
                        revenue: 0
                    });
                } else {
                    statisticResponseData.push(statistic);
                }
            }
            setDailyStatisticList(statisticResponseData);
        }
    }

    const getMonthlyStatisticByYear = async () => {
        const response = await fetch(`/api/statistic/monthly?year=${year}`, { method: 'GET' })
        if (response.ok) {
            const responseJson = await response.json();
            const statisticResponseList: Statistic[] = responseJson.data.statisticResponseList;

            const statisticResponseData: Statistic[] = [];

            for (let i = 1; i <= 12; i++) {
                const statistic: Statistic | undefined = statisticResponseList.find(statisticResponse => {
                    return Number(statisticResponse.time) === i;
                })
                if (statistic === undefined) {
                    statisticResponseData.push({
                        time: i.toString(),
                        revenue: 0
                    });
                } else {
                    statisticResponseData.push(statistic);
                }
            }
            setMonthlyStatisticList(statisticResponseData);
        }
    }

    const onSelectMonth = (_: Dayjs, dateString: string | string[]) => {
        setSelectedMonth(dateString.toString());
    }

    return <div style={{ height: '100vh' }}>
        <div>
            <Row>
                <Col span={24}>
                    <div>
                        <span style={{ fontSize: 18, fontWeight: 'bold' }}>Thống kê theo ngày</span>
                        <div style={{ marginBottom: 40, marginTop: 20 }}>
                            <DatePicker value={dayjs(selectedMonth, 'MM-YYYY')}
                                picker="month"
                                format={'MM-YYYY'}
                                onChange={onSelectMonth}
                                allowClear={false} />
                        </div>
                        <div style={{ display: 'block' }}>
                            <Line data={dailyStatisticList}
                                height={400}
                                xField={'time'}
                                yField={'revenue'}
                                tooltip={{
                                    title: (data: Statistic) => 'Ngày ' + data.time,
                                    items: [{
                                        name: 'Doanh thu',
                                        channel: 'y',
                                        field: 'revenue',
                                        valueFormatter: (revenue: number) => revenue.toLocaleString() + ' VNĐ'
                                    }]
                                }}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        <Divider />
        <div>
            <Row>
                <Col span={12}>
                    <div>
                        <span style={{ fontSize: 18, fontWeight: 'bold' }}>Thống kê theo tháng</span>
                        <div style={{ marginBottom: 40, marginTop: 20 }}>
                            <Select
                                value={year}
                                onSelect={onSelectYear}
                                options={yearList.map(year => ({
                                    value: year,
                                    label: year,
                                }))}
                            />
                        </div>
                        <div style={{ display: 'block' }}>
                            <Column
                                data={monthlyStatisticList}
                                height={400}
                                xField={'time'}
                                yField={'revenue'}
                                tooltip={{
                                    title: (data: Statistic) => 'Tháng ' + data.time,
                                    items: [{
                                        name: 'Doanh thu',
                                        channel: 'y',
                                        field: 'revenue',
                                        valueFormatter: (revenue: number) => revenue.toLocaleString() + ' VNĐ'
                                    }]
                                }} />

                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div>
                        <span style={{ fontSize: 18, fontWeight: 'bold' }}>Thống kê theo năm</span>
                        <div style={{ display: 'block', marginTop: 50 }}>
                            <Line data={yearlyStatisticList}
                                height={400}
                                xField={'time'}
                                yField={'revenue'}
                                point={{
                                    shapeField: 'square',
                                    sizeField: 4,
                                }}
                                interaction={{
                                    tooltip: {
                                        marker: false,
                                    },
                                }}
                                tooltip={{
                                    title: (data: Statistic) => 'Năm ' + data.time,
                                    items: [{
                                        name: 'Doanh thu',
                                        channel: 'y',
                                        field: 'revenue',
                                        valueFormatter: (revenue: number) => revenue.toLocaleString() + ' VNĐ'
                                    }]
                                }}
                                style={{
                                    lineWidth: 2,
                                }} />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>

}

export default StatisticDashboard;