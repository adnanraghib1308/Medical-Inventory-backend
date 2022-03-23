import React from 'react'
import Card from '../../component/Card';
import {AddManuallyCard, StockListCard} from '../../helpers/constant';

const Inventory = ({history}) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card type={AddManuallyCard.type} title={AddManuallyCard.title} imageLink={AddManuallyCard.imageLink} buttonText={AddManuallyCard.buttonText} />
      <Card type={StockListCard.type} title={StockListCard.title} imageLink={StockListCard.imageLink} buttonText={StockListCard.buttonText} />
    </div>
  );
}

export default Inventory;
