import React from 'react';
import {Form, Row, Col, Input, Button, Card} from 'antd';
import {SearchOutlined, PlusOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";

const Filter = ({loadData}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    loadData(values);
  }

  return (
    <Card>
      <Form form={form} onFinish={onFinish} >
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Form.Item name={"name"}>
              <Input placeholder={"Name"}/>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item name={"party_name"}>
              <Input placeholder={"Party Name"}/>
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
            <Form.Item>
              <Link to={"/inventory/add"}>
                <Button type={'outlined'}  style={{width: '100%'}} ><PlusOutlined />Add NewProduct</Button>
              </Link>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default Filter;