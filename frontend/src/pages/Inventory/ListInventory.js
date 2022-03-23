import React, {useEffect, useState} from 'react'
import { Table, Tag, Row, Col, Card, Popconfirm } from 'antd';
import * as request from '../../request/inventory/request';
import {EditOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment';
import Filter from "./Filter";
import {Link} from "react-router-dom";
import PageOverview from "../../component/PageOverview";
import withErrorHandler from '../../helpers/withErrorHandler';


const ListInventory = () => {

  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  // columns for table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Selling Price",
      dataIndex: "selling_price",
      key: "selling_price",
    },
    {
      title: "Party Name",
      dataIndex: "party_name",
      key: "party_name",
    },
    {
      title: "Mfg Date",
      dataIndex: "mfg_date",
      key: "mfg_date",
    },
    {
      title: "Exp Date",
      dataIndex: "exp_date",
      key: "exp_date",
    },
    {
      title: "Issue",
      key: "issue",
      render: (text, record) => {
        if(record.stock == 0){
          return <Tag color={'volcano'}>Out Of Stock</Tag>
        }
        else if(record.low_stock_warning > record.stock){
          return <Tag color={'volcano'}>Low Stock</Tag>
        }
        else {
          return <div></div>
        }
      }
    },
    {
      title: "Edit",
      key: "edit",
      render: (text, record) => {
        return (
          <>
            <Link to={`/inventory/edit/${record._id}`} >
              <EditOutlined/>
            </Link>
            <Popconfirm title={"Are you sure you want to delete this product?"} onConfirm={() => onDeleteConfirm(record._id)} okText="Yes" cancelText="No">
              <DeleteOutlined style={{color: 'red', padding: '4px'}}/>
            </Popconfirm>
          </>
        )
      }
    }
  ];

  const onDeleteConfirm = async (id) => {
    await request.deleteProduct(id);
    loadData({});
  }
  const loadData = withErrorHandler(async (filter) => {
    setLoader(true)
    const {data: productData} = await request.getAllProducts(filter);
    const formatedProductData = productData.map(item => {
      return {...item,
        mfg_date: moment(item.mfg_date).format('MMMM Do YYYY'),
        exp_date: moment(item.exp_date).format('MMMM Do YYYY')
      }
    })
    setProducts(formatedProductData);
    setLoader(false);
  });

  useEffect(() => {
    loadData({});
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <PageOverview title={"Inventory List"} description={"View edit and delete your stock from here. You can also search for using filter to search for specific item."} />
      </Col>
      <Col span={24}>
        <Filter loadData = {loadData}/>
      </Col>
      <Col span={24}>
        <Card>
          <Table dataSource={products} columns={columns} loading={loader} />
        </Card>
      </Col>
    </Row>
  )
}

export default ListInventory
