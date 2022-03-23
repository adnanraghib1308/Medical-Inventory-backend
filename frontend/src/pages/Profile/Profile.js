import React, {useEffect} from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import * as request from '../../request/User/request';
import {Card, Row, Col, Form, Input, Button, notification} from 'antd';
import PageOverview from "../../component/PageOverview";
import withErrorHandler from "../../helpers/withErrorHandler";

const {TextArea} = Input;
const Profile = () => {
  const [form] = Form.useForm();

  const openNotification = ({ message }) => {
    notification.success({
      message,
    });
  };

  const onSubmit = withErrorHandler(async (values) => {
    await request.updateUserData(values);
    openNotification({message: "User data updated successfully."})
  });

  const fetchData = withErrorHandler(async () => {
    const {data: userData} = await request.getUserData();
    form.setFieldsValue(userData);
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <PageOverview title={"Manage Profile"} description={"Manage Your Profile from here. You can edit you company details which will be reflected in your billing invoice."} />
      </Col>
      <Col span={24}>
        <Card>
          <Form layout={"vertical"} form={form} onFinish={onSubmit}>
            <Row gutter={[16, 16]} style={{padding: "20px", marginLeft: "30px", marginRight: "30px"}}>
              <Col span={24}>
                <Form.Item label={"First Name"} name={"first_name"} rules={[{required: true}]}>
                  <Input style={{width: "100%"}}/>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={"Last Name"} name={"last_name"} rules={[{required: true}]}>
                  <Input style={{width: "100%"}}/>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={"Email"} name={"email"} >
                  <Input style={{width: "100%"}} disabled/>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={"GST Number"} name={"gst_number"} rules={[{required: true}]}>
                  <Input style={{width: "100%"}}/>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={"Company Name"} name={"company_name"} rules={[{required: true}]}>
                  <Input style={{width: "100%"}}/>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={"Company Address"} name={"company_address"} rules={[{required: true}]}>
                  <TextArea style={{width: "100%"}}/>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={"Footer Text"} name={"footer_text"} rules={[{required: true}]}>
                  <TextArea style={{width: "100%"}}/>
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Button type={'primary'} htmlType={'submit'} style={{width: '100%'}}>Save</Button>
              </Col>
              <Col xs={24} lg={12}>
                <Button type={'danger'} style={{width: '100%'}}>Clear</Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
