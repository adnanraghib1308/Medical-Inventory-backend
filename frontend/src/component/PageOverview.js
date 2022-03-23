import React from 'react';

import {Typography, Card, Button, Icon, Row, Col} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
const { Title, Paragraph } = Typography;


export default ({
                  title,
                  titleLevel = 2,
                  description,
                  ...props
                }) => {
  const [dismissed, dismiss] = React.useState(false);
  if(dismissed) return <></>;
  return (
    <Card {...props}>
      <Row>
        <Col span={22}>
          <Title ellipsis={true} level={titleLevel}>{title}</Title>
          <Paragraph ellipsis={{ rows: 3, expandable: true }}>{description}</Paragraph>
        </Col>
        <Col span={2} style={{display: 'flex', justifyContent: 'end'}}>
          <Button onClick={() => dismiss(true)}  type='text' >
            <CloseOutlined />
          </Button>
        </Col>
      </Row>
    </Card>
  )
}