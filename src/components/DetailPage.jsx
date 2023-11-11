

import { useData } from './DataContext';
import { Avatar, Card, Row, Col, Tag, Typography, Button, Divider, Rate, Progress, Timeline, Tooltip } from 'antd';
import { UserOutlined, EnvironmentOutlined, BankOutlined, CalendarOutlined } from '@ant-design/icons';
import { HeartOutlined, MessageOutlined, HeartTwoTone } from '@ant-design/icons';
const { Meta } = Card;
const { Text } = Typography;
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// const DetailPage = () => {
//     const { data } = useData(); // 从Context中获取数据

//     if (!data) {
//         return <div>No data available.</div>;
//     }

//     return (
//         <div style={{ padding: '20px' }}>
//             <Row gutter={[16, 16]}>
//                 <Col xs={24} md={12} lg={8}>
//                     <Card bordered={false}
//                         actions={[
//                             <HeartOutlined key="collect" />,
//                             <MessageOutlined key="chat" />
//                         ]}
//                     >
//                         <Row>
//                             <Col style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around' }}>
//                                 <Avatar size={64} src={data.avatarUrl} />
//                                 <p>{data.gender}</p><p>{data.birth}</p>
//                             </Col>
//                             <Col>
//                                 <h2>{data.name}</h2>
//                                 <p><EnvironmentOutlined style={{ marginRight: '5px' }} />{data.location}</p>
//                                 <p><BankOutlined style={{ marginRight: '5px' }} />{data.position}</p>
//                                 <p><CalendarOutlined style={{ marginRight: '5px' }} />{data.experience}</p>
//                             </Col>
//                         </Row>
//                         <Meta
//                             avatar={<Avatar size={64} src={data.avatarUrl} />}
//                             title={data.name}
//                             description={<>
//                                 <p><EnvironmentOutlined style={{ marginRight: '5px' }} />{data.location}</p>
//                                 <p><BankOutlined style={{ marginRight: '5px' }} />{data.position}</p>
//                                 <p><CalendarOutlined style={{ marginRight: '5px' }} />{data.experience}</p>
//                             </>}
//                         />
//                     </Card>
//                 </Col>

//                 <Col xs={24} md={12} lg={16}>
//                     <Card title="Experience" bordered={false}>
//                     </Card>
//                     <Card title="Skills" bordered={false}>
//                         {
//                             data.tags.map((tag) => (
//                                 <Tag color={tag.color} key={tag.name} style={{ marginBottom: '5px' }}>
//                                     {tag.name}
//                                 </Tag>
//                             ))
//                         }
//                     </Card>
//                 </Col>
//             </Row>
//         </div>
//     );
// }

const DetailPage = () => {
    const navigate = useNavigate();
    const [collect, setCollect] = useState(false);

    const { data } = useData(); // 从Context中获取数据
    if (!data) {
        navigate('/');
        return <div>No data available.</div>;
    }

    return (
        <>
            <Card style={{ borderRadius: '20px', width: '60%', margin: '0 auto' }}>
                <Row style={{ display: 'flex', alignItems: 'center' }}>
                    <Col style={{ marginRight: 'auto' }}>
                        <Row>
                            <Text strong><h3>{data.name}</h3></Text>
                            <Text strong><h4 style={{ color: '#FF8000', marginLeft: '30px' }}>{data.expectedSalary}</h4></Text>
                        </Row>

                        <Row style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                            <div><EnvironmentOutlined />{data.location}</div>
                            <div><CalendarOutlined />{data.experience}</div>
                            <div> <BankOutlined />{data.education?.[0].level} - {data.education?.[0].school}</div>
                        </Row>
                    </Col>
                    <Col>
                        {collect ? <Button onClick={() => { setCollect(!collect) }} type="primary" ghost><HeartTwoTone />Save</Button> : <Button onClick={() => { setCollect(!collect) }}><HeartOutlined />Save</Button>}
                        <Button type='primary' style={{ marginLeft: '10px' }}><MessageOutlined />Chat</Button>
                    </Col>

                </Row>
                <Divider style={{ marginBottom: '10px' }} />
                <Row>
                    <h2>Match Rate</h2>
                </Row>
                <Row>
                    <Col span={8}>
                        <Progress type="dashboard" percent={data.matchRate} />
                    </Col>
                    <Divider type="vertical" style={{ height: 'auto' }} />
                    <Col span={10} offset={2}>
                        {
                            data.tags?.map((tag) => (
                                <Tag color={tag.color} key={tag.name} style={{ marginBottom: '5px' }}>
                                    {tag.name}
                                </Tag>
                            ))
                        }
                    </Col>
                </Row>

                <Row style={{ margin: '20px 0' }}>
                    <Text type="secondary"> {data.matchDescription}</Text>
                </Row>

                <Row style={{ width: '100%' }}>
                    <Timeline
                        style={{ width: '100%', marginLeft: '-80px' }}
                        mode="left"
                        items={data.timeLine}
                    />
                </Row>


                <Row>
                    <Col span={8}>
                        <Tooltip title={() => {
                            let rnt = '';
                            switch (data.review.rate) {
                                case 0:
                                    rnt = 'Bad';
                                    break;
                                case 1:
                                    rnt = 'Common';
                                    break;
                                case 2:
                                    rnt = 'Excellent';
                                    break;
                                case 3:
                                    rnt = 'Excellent';
                                    break;
                                case 4:
                                    rnt = 'Perfect';
                                    break;
                                case 5:
                                    rnt = 'Amazing';
                                    break;
                                default:
                                    break;
                            }
                            return rnt
                        }}>
                            <Rate disabled defaultValue={data.review.rate} />
                        </Tooltip>
                        <Row style={{ marginTop: '10px' }}>
                            {data.review.desp}
                        </Row>
                    </Col>




                    <Divider type="vertical" style={{ height: 'auto' }} />
                    <Col span={10} offset={2}>
                        {data.comments?.map((comment) => (
                            <Row key={comment.key}>
                                <Col span={8}>
                                    <Text>{comment.key}</Text>
                                </Col>
                                <Col span={16}>
                                    <Tooltip title={comment.value}>
                                        <Progress percent={comment.value} showInfo={false} size="small" />
                                    </Tooltip>
                                </Col>
                            </Row>
                        ))}

                    </Col>
                </Row>



            </Card>
        </>
    )

}
export default DetailPage;