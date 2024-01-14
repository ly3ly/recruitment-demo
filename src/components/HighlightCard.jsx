import { Card,Row,Col, Divider,Typography, Flex } from "antd";
import Icon, { RadarChartOutlined,BankOutlined,ProfileOutlined } from '@ant-design/icons';
const { Text, Title } = Typography;
const HighlightCard = ({yoe,highlights,experiences}) => {
   
    const iconSize = '25px'
  return (
    <>
      <Card title="Highlights">

      <Row style={{display:'flex'}}>
            <Col ><BankOutlined style={{ fontSize: iconSize }}/></Col>
            <Col style={{marginLeft:'auto'}}>{yoe}</Col>
        </Row>
        <Divider></Divider>
        <Row style={{display:'flex'}}>
            <Col ><RadarChartOutlined style={{ fontSize: iconSize }}/></Col>
            <Col style={{marginLeft:'auto',display:'flex',flexDirection:'column',alignItems:'flex-end'}}>{highlights.map((item,idx)=><Row key={idx} ><Text >{item}</Text></Row>)}</Col>
        </Row>
        <Divider></Divider>
        <Row style={{display:'flex'}}>
            <Col ><ProfileOutlined style={{ fontSize: iconSize }}/></Col>
            <Col style={{marginLeft:'auto',display:'flex',flexDirection:'column',alignItems:'flex-end'}}>{experiences.map((item,idx)=><Row key={idx} ><Text >{item}</Text></Row>)}</Col>
        </Row>
       
      </Card>
    </>
  );
};

export default HighlightCard;
