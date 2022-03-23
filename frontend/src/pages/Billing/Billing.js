import React, {useEffect, useState} from 'react'
import {formItemLayout, tailFormItemLayout} from "../../theme/_formLayout";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Typography,
  Row,
  Col,
  notification,
  Spin,
  Card,
  AutoComplete,
  Divider
} from "antd";
import * as request from '../../request/billing/request'
import ProductList from './ProductList';
import withErrorHandler from "../../helpers/withErrorHandler";
import {product, tryCatch} from "ramda";
import {PlusOutlined, ShoppingCartOutlined, InfoCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import {getAllProducts} from "../../request/inventory/request";
import PageOverview from "../../component/PageOverview";

const { isProduction, BASE_API_URL, LOCAL_BASE_URL} = require('../../helpers/constant');

const API_URL = isProduction ? BASE_API_URL : LOCAL_BASE_URL;


const { Title } = Typography;
const {Search } = Input
const Billing = (props) => {

  const [option, setOptions] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filePath, setFilePath] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAllProductData();
  }, []);

  const fetchAllProductData = async () => {
    const {data: productData} = await getAllProducts({});
    const optionData = productData.map((item) => ({...item, value: item.name}));
    setOptions(optionData);
  }

  const productSelect = (option, key) => {
    const product = form.getFieldValue("products");

    product[key].selling_price = option.selling_price;
    product[key].id = option._id;

    form.setFieldsValue({
      products: product
    });
  }

  const openNotification = ({ message }) => {
    notification.success({
      message,
    });
  };

  const onFinish = withErrorHandler(async (values) => {
    try {
      setLoader(true);
      const filePathResponse = await request.makeSale(values);
      setLoader(false);
      setFilePath(filePathResponse);
      openNotification({ message: "Sale was successful. Please download Invoice." });
    } catch (e) {
      setLoader(false);
      throw e;
    }
  })

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <PageOverview title={"Generate Bill"} description={"Enter customer and product details to generate make your sale and generate invoice"} />
      </Col>
      <Col span={24}>
        <Card>
          <Spin spinning={loader}>
          <Form form={form} onFinish={onFinish} initialValues={{products: [undefined]}}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Divider orientation={'left'}> <InfoCircleOutlined /> Customer Details </Divider>
              </Col>
              <Col sm={24} lg={12}>
                <Form.Item name={"customer_name"} rules={[{required: true}]}>
                  <Input placeholder={"Customer Name"} />
                </Form.Item>
              </Col>
              <Col sm={24} lg={12}>
                <Form.Item name={"customer_number"} rules={[{required: true}]}>
                  <Input placeholder={"Customer Number"}/>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Divider orientation={'left'} > <ShoppingCartOutlined /> Product Details </Divider>
              </Col>
            </Row>
            <Form.List name={"products"}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Row gutter={[16, 16]}>
                      <Col span={16}>
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          fieldKey={[
                            fieldKey,
                            "name",
                          ]}
                          rules={[{required: true}]}
                        >
                          <AutoComplete
                            placeholder={"Product Name"}
                            options={option} style={{width: '100%'}}
                            onSelect={(data, option) => productSelect(option, key)}
                            filterOption={(inputValue, option) =>
                              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          name={[name, "selling_price"]}
                          fieldKey={[
                            fieldKey,
                            "selling_price",
                          ]}
                          rules={[{required: true}]}
                        >
                        <InputNumber placeholder={"Price"} style={{width: '100%'}} disabled/>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          name={[name, "quantity"]}
                          fieldKey={[
                            fieldKey,
                            "quantity",
                          ]}
                          rules={[{required: true}]}
                        >
                        <InputNumber placeholder={"Quantity"} style={{width: '100%'}} min={1} />
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add More Products
                    </Button>
                </>
              )}
            </Form.List>
            <Row gutter={[16, 16]} style={{marginTop: "30px"}}>
              <Col xs={24} lg={12}>
                <Form.Item>
                  <Button type={'primary'} htmlType={'submit'} style={{width:"100%"}}>Make Sale</Button>
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item>
                  <Button  type={"danger"} style={{width:"100%"}}>Clear</Button>
                </Form.Item>
              </Col>
              {filePath && <Col span={24}>
                <a
                  target="_blank"
                  style={{ paddingBottom: "10px" }}
                  href={`${API_URL}billing/download/?file_path=${filePath}`}
                >
                  <Button type={"dashed"} block icon={<DownloadOutlined />}>Download Invoice</Button>
                </a>
              </Col>}
            </Row>
          </Form>
          </Spin>
        </Card>
      </Col>
    </Row>
  )
}

//const WrappedBillingForm = Form.create()(Billing);
export default Billing;
