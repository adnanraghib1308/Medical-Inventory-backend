import React from 'react';

import { Typography, Card, Button } from 'antd';
const { Title, Text } = Typography;

export default ({
                  label,
                  value,
                  sublabel,
                  ...props
                }) => {
  return (
    <Card >
      <Title level={5}>{label}</Title>
      <Title level={2}>{value}</Title>
      <Text >{sublabel}</Text>
    </Card>
  )
}