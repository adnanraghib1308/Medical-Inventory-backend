import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Input, Button, notification, Spin, InputNumber, DatePicker, Card } from 'antd';
import { formItemLayout, tailFormItemLayout } from "../../theme/_formLayout";
import withErrorHandler from '../../helpers/withErrorHandler';
import * as request from '../../request/inventory/request';
import moment from "moment";


const AddInventory = (props) => {
  const [loader, setLoader] = useState(false);

  const {TextArea} = Input;
  const [form] = Form.useForm();

  const openNotification = ({ message }) => {
    notification.success({
      message,
    });
  };

  const handleSubmit = withErrorHandler(async (values) => {
    const id = props.match.params.id;
    try {
      setLoader(true);
      if(id) values.id = id;
      await request.addProductData(values);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      throw error;
    }
    var msg = "";
    if(id) msg = "Product updated Successfully"
    else msg = "Product added Successfully"
    openNotification({ message: msg})
  });

  const clearData = () => {
    form.resetFields();
  }

  const fetchData = async (id) => {
    const {data} = await request.fetchProductDataWithId(id);
    console.log("product data .>>>>>", data);
    form.setFieldsValue({
      name: data.name,
      quantity_in_stock: data.stock,
      low_stock_warning: data.low_stock_warning,
      selling_price: data.selling_price,
      party_name: data.party_name,
      mfg_date: moment(data.mfg_date),
      exp_date: moment(data.exp_date)
    });
  }
  useEffect(()  => {
    const id = props.match.params.id;
    // id edit mode
    if(id){
      fetchData(id);
    }
  }, [])
  return (
    <Card>
      <Spin spinning={loader}>
        <Row style={{display: 'flex', justifyContent: 'end'}}>
          <Button onClick={()=> props.history.push('/inventory/list')}>See Product List</Button>
        </Row>
        <Form form={form} onFinish={handleSubmit} labelCol={{sm: 24, lg: 8}} wrapperCol={{sm:24, lg: 9}}>
          <Form.Item label="Name" name={"name"} style={{ marginTop: "30px" }} rules={[{required: true, type: "string"}]}>
            <Input/>
          </Form.Item>
          <Form.Item label="Quantity In Stock" name={"quantity_in_stock"} rules={[{required: true, type: "number"}]}>
            <InputNumber style={{width: "100%"}} min={0}/>
          </Form.Item>
          <Form.Item label="Low Stock Warning" name={"low_stock_warning"} rules={[{required: true, type: "number"}]}>
            <InputNumber style={{width: "100%"}} min={0}/>
          </Form.Item>
          <Form.Item label="Selling Price (1 item)" name={"selling_price"} rules={[{required: true, type: "number"}]}>
            <InputNumber style={{width: "100%"}} min={0}/>
          </Form.Item>
          <Form.Item label="Purchase Party Name" name={"party_name"} rules={[{required: true, type: "string"}]}>
            <Input style={{width: "100%"}} />
          </Form.Item>
          <Form.Item label={"Manufacturing Date"} name={"mfg_date"} rules={[{required: true}]}>
            <DatePicker style={{width: "100%"}} />
          </Form.Item>
          <Form.Item label={"Expiry Date"} name={"exp_date"} rules={[{required: true}]}>
            <DatePicker style={{width: "100%"}} />
          </Form.Item>
          <Form.Item wrapperCol={{span: 24}}>
          <Row>
            <Col span={6}></Col>
            <Col span={5}>

                <Button
                  type="primary"
                  htmlType={'submit'}
                  style={{width: "100%"}}
                >
                  {props.match.params.id ? "Save Product" : "Create Product"}
                </Button>
            </Col>
            <Col span={1}/>
            <Col span={5}>
                <Button
                  type="danger"
                  onClick={clearData}
                  style={{width: "100%"}}
                >
                  {"Clear"}
                </Button>

            </Col>
            <Col span={6}></Col>
          </Row>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
}

export default AddInventory;
