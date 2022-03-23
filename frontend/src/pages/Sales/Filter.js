import React from 'react';
import {Form, Row, Col, Input, Button, Card, DatePicker} from 'antd';
import withErrorHandler from "../../helpers/withErrorHandler";
import * as request from "../../request/inventory/request";
import {SearchOutlined, PlusOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";

const Filter = ({loadData}) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    loadData(values);
  }

  const clearForm = () => {
    form.resetFields();
  }

  return (
    <Card>
      <Form form={form} onFinish={onFinish} >
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Form.Item name={"customer_name"}>
              <Input placeholder={"Customer Name"}/>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item name={"contact_number"}>
              <Input placeholder={"Contact Number"}/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Form.Item name={"order_number"}>
              <Input placeholder={"Order Number"}/>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item name={"sale_date"}>
              <DatePicker placeholder={"Sale Date"} style={{width: '100%'}}/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Form.Item>
              <Button type={'primary'}  style={{width: '100%'}} htmlType={'submit'} ><SearchOutlined/>Search</Button>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Button type={'danger'} style={{width: '100%'}} onClick={clearForm}>Clear</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default Filter;