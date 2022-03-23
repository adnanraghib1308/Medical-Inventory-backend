import React, {useState, useEffect} from 'react';
import {Button, Table, Row, Card, Col, Spin} from "antd";
import * as request from "../../request/sales/request";
import { DownloadOutlined } from '@ant-design/icons';
import moment from "moment";
import Filter from './Filter';
import PageOverview from "../../component/PageOverview";
import withErrorHandler from '../../helpers/withErrorHandler';
const { isProduction, BASE_API_URL, LOCAL_BASE_URL} = require('../../helpers/constant');

const API_URL = isProduction ? BASE_API_URL : LOCAL_BASE_URL;

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  const columns = [
  {
    title: "Order No.",
    dataIndex: "order_number",
    key: "order_number",
  },
    {
    title: "Customer Name",
    dataIndex: "customer_name",
    key: "name",
  },
  {
    title: "Contact Number",
    dataIndex: "contact_number",
    key: "contact_number",
  },
  {
    title: "Sale Amount",
    dataIndex: "amount",
    key: "amount",
  },
    {
    title: "Sale Date",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <div>
        <a
          target="_blank"
          href={`${API_URL}billing/download/?file_path=${record.bill_path}`}
        >
          <Button type="dashed" block icon={<DownloadOutlined />}>Invoice</Button>
        </a>
      </div>
    ),
  },
];

  const loadData = withErrorHandler(async (filter) => {
    setLoader(true);
    const { data: sales } = await request.getAllSalesData(filter);
    const formatSalesData = sales.map(item => ({
      ...item,
      createdAt: moment(item.createdAt).format('MMMM Do YYYY HH:MM'),
      amount: '₹' + item.amount
    }))
    setSalesData(formatSalesData);
    setLoader(false);
  });

  useEffect(() => {
    loadData({});
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <PageOverview title={"Sales Data"} description={"Track your sales data from here. Search for any of your previous sales record using customer name, customer number, order number or sales date. You can also download the sale invoice"} />
      </Col>
      <Col span={24}>
        <Filter loadData={loadData}/>
      </Col>
      <Col span={24}>
        <Card>
          <Table dataSource={salesData} columns={columns} loading={loader}></Table>
        </Card>
      </Col>
    </Row>
  );
}

export default Sales;
