/* eslint-disable react/prop-types */
import { Card } from 'antd';
import { Divider, Tag, Row, Col, Typography } from "antd";
// import {Avatar} from "antd;"
const { Text } = Typography;
import {
    EnvironmentOutlined,
    CalendarOutlined,
    // MoneyCollectOutlined,
    BankOutlined
} from '@ant-design/icons';


const TalentCard = ({ /*avatarUrl, */name, birth, gender, expectedSalary, tags, location, position, experience }) => {

    return (
        <>

            <Card style={{ borderRadius: '20px', width: '100%' }} hoverable>
                <Row justify="space-between" align="middle" style={{ width: '100%', marginBottom: '10px' }}>
                    {/* <Col flex="auto" style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar size="large" src={avatarUrl} />
                    <Divider type="vertical" /> 
                        <Text><h3><strong>{name}</strong></h3></Text>
                        <Divider type="vertical" />
                        <Text>{gender}</Text>
                        <Divider type="vertical" />
                        <Text>{birth}</Text>
                    </Col> */}
                    <Col flex="auto" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 style={{ margin: 0 }}><strong>{name}</strong></h3>
                        </div>
                        <Divider type="vertical" style={{ height: 'auto' }} />
                        <Text style={{ display: 'flex', alignItems: 'center' }}>{gender}</Text>
                        <Divider type="vertical" style={{ height: 'auto' }} />
                        <Text style={{ display: 'flex', alignItems: 'center' }}>{birth}</Text>
                    </Col>

                    <Col flex="auto" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* <Text strong>
                                <MoneyCollectOutlined style={{ marginRight: '1px' }} />
                                Expected Salary
                            </Text> */}
                            <Text strong style={{ fontSize: '15px', color: '#FF8000' }}>
                                {expectedSalary}
                            </Text>
                        </Col>
                    </Col>
                </Row>
                <Row justify="flex-start" align="middle" style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }}>
                    {
                        tags.map((tag) => (
                            <Tag color={tag.color} key={tag.name} style={{ marginBottom: '5px' }}>
                                {tag.name}
                            </Tag>
                        ))
                    }
                </Row>
                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Text strong>
                            <EnvironmentOutlined style={{ marginRight: '1px' }} />
                            Location
                        </Text>
                        <Text type="secondary">
                            {location}
                        </Text>
                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Text strong>
                            <BankOutlined style={{ marginRight: '1px' }} />
                            Current
                        </Text>
                        <Text type="secondary">
                            {position}
                        </Text>
                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Text strong>
                            <CalendarOutlined style={{ marginRight: '1px' }} />
                            Experiences
                        </Text>
                        <Text type="secondary">
                            {experience}
                        </Text>
                    </Col>
                </Row>
            </Card >
        </>
    );
};
export default TalentCard;