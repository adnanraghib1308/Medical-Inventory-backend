import React, {useEffect, useState} from 'react';
import { Typography, Row, Col, Card } from 'antd';
import PageOverviewCard from '../../component/PageOverview';
import StatsCard from '../../component/StatsCard';
import * as request from '../../request/home/request';
import { Line } from '@ant-design/charts';
import withErrorHandler from "../../helpers/withErrorHandler";

export default () => {

  const [homePageData, setHomePageData] = useState({});
  const [chartConfig, setChartConfig] = useState({data: []});

  const config = {
    data: [],
    xField: 'sale_date',
    yField: 'amount',
    label: {},
    point: {
      size: 3,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };

  const fetchData = withErrorHandler(async () => {
    const {data} = await request.getHomePageData();
    setHomePageData(data);
    config.data = data.last10DaysSale;
    console.log("DAATA", data)
    setChartConfig(config);
  })

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
      <PageOverviewCard title="Home" description="View your overall stats at a glance" />
      </Col>
      <Col span={24}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={8}>
          <StatsCard label="Last Month" value={"₹" + homePageData.lastMonthSalesAmount} sublabel="+20%" />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <StatsCard label="Last Week" value={"₹" + homePageData.lastWeekSalesAmount} sublabel="-5%" />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <StatsCard label="Yesterday" value={"₹" + homePageData.lastDaySalesAmount} sublabel="+14%" />
        </Col>
        <Col span={24}>
          <Card title={"Last 10 days sales graph"}>
            <Line {...chartConfig} />
          </Card>
        </Col>
      </Row>
      </Col>
    </Row>
  )
}