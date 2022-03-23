import React, {useState, useEffect} from 'react'
import { List, Button, Card, Input, InputNumber, Divider } from 'antd';
import { PlusCircleOutlined, SearchOutlined, FolderOutlined, MinusCircleOutlined  } from '@ant-design/icons'

const list = [
  {
    _id: 1,
    name: "a",
    stock: 134,
    selling_price: 5354,
  },
  {
    _id: 2,
    name: "b",
    stock: 134,
    selling_price: 5354,
  },
  {
    _id: 3,
    name: "c",
    stock: 134,
    selling_price: 5354,
  },
];
const ProductList = (props) => {
  const [myList, setMyList] = useState(null);
  const [searchList, setSearchList] = useState(props.searchResults);
  

  useEffect(() => {
    setSearchList(props.searchResults);
  }, [props.searchResults]);

  const addMyList = (item) => {
    myList ? setMyList([...myList, item]) : setMyList([item]);
    myList ? props.setProductDetail([...myList, item]) : props.setProductDetail([item]);
    const newSearchList = searchList.filter(data => data._id !== item._id);
    setSearchList(newSearchList);
  }

  const addSearchList = (item) => {
    setSearchList([...searchList, item]);
    const newMyList = myList.filter(data => data._id !== item._id);
    setMyList(newMyList);
    props.setProductDetail(newMyList);
  }

  const addQuantity = (value, item) => {
    const newProductQuantities = props.productQuantities;
    newProductQuantities[item._id] = value;
    props.setProductQuantities(newProductQuantities);
  }

  const MyListHelper = () => {
    return (
      <Card>
        <Divider orientation="left">
          {" "}
          <FolderOutlined /> My Bag
        </Divider>
        <List
          itemLayout="horizontal"
          dataSource={myList}
          renderItem={(item) => (
            <List.Item>
              <p>{`Product Name:  ${item.name}`}</p>
              <p>{`Stock:  ${item.stock}`}</p>
              <p>{`Selling Price:  ${item.selling_price}`}</p>
              <InputNumber
                onChange={(value) => addQuantity(value, item)}
                placeholder={"Quantity"}
              />
              <Button
                onClick={() => addSearchList(item)}
                size="medium"
                shape="circle"
                type="primary"
              >
                <MinusCircleOutlined />
              </Button>
            </List.Item>
          )}
        />
      </Card>
    );
  }

  const SearchResult = () => {
    return (
      <div>
        <Divider orientation="left">
          {" "}
          <SearchOutlined /> Search Results
        </Divider>
        <List
          itemLayout="horizontal"
          dataSource={searchList}
          renderItem={(item) => (
            <List.Item>
              <p>{`Product Name:  ${item.name}`}</p>
              <p>{`Stock:  ${item.stock}`}</p>
              <p>{`Selling Price:  ${item.selling_price}`}</p>
              <Button
                onClick={() => addMyList(item)}
                size="medium"
                shape="circle"
                type="primary"
              >
                <PlusCircleOutlined />
              </Button>
            </List.Item>
          )}
        />
      </div>
    );
  }
  return (
    <div>
      {searchList && <SearchResult />}
      {myList && <MyListHelper />}
    </div>
  );
}

export default ProductList
