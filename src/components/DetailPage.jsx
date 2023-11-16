/* eslint-disable react/prop-types */


import { useData } from './DataContext';
import { Row, Col, Tag, Typography, Button, Divider, Rate, Progress, Timeline, Tooltip, Card } from 'antd';
import { EnvironmentOutlined, BankOutlined, CalendarOutlined } from '@ant-design/icons';
import { HeartOutlined, MessageOutlined, HeartTwoTone } from '@ant-design/icons';
const { Text, Title } = Typography;
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MultiChoice from './MultiChoice';


import { Modal } from 'antd';
import { updateCheck } from '../../api/check';
const PopupModal = ({ show, dataList }) => {
    const [thisShow, setShow] = useState(false)

    useEffect(() => {
        setShow(dataList.length > 0)
    }, [show])

    return (
        <Modal
            width="80%"
            open={thisShow} title="Recommend reason" footer={null}
            onCancel={() => {
                setShow(false)
            }}
            style={{ maxHeight: '80vh', overflow: 'scroll' }}>
            {dataList.map((item, index) => {
                return (
                    <div key={index}>
                        <Title level={3}>{item} Reason</Title>

                        <p>Lorem ipsum dolor sit amet, ea qui nullam altera molestiae. In esse scribentur usu. His dolore delectus et. Populo nonumes oporteat cu mel, et sit lorem suscipit invenire. Mea tota aperiri torquatos an, an illud facer recusabo vis. Vim ut labitur molestiae eloquentiam, oratio torquatos nam ad, tractatos moderatius ius ei.

                            Eos ut quaerendum scriptorem, usu tempor putant id, ex est ludus mucius oblique. Eum consul forensibus disputationi te. Nec feugiat invenire erroribus id, duo ei iudico constituam. Feugait probatus his no.</p>
                    </div>
                )
            })}

            {/* <Title level={3}>Explanation Type</Title> */}
            {/* <MultiChoice></MultiChoice> */}
        </Modal>
    );
};


const DetailPage = () => {
    const navigate = useNavigate();
    const [collect, setCollect] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkList, setCheckedList] = useState([]);

    useEffect(() => {
        const updateData = async () => {
            try {
                await updateCheck()
            } catch (error) {
                console.error(error); // 处理错误
            }
        }
        updateData()

    }, [checkList])


    const { data } = useData(); // 从Context中获取数据
    if (!data) {
        navigate('/');
        return <div>No data available.</div>;
    }



    return (
        <>
            <Card style={{ borderRadius: '20px', margin: '0 auto' }} >
                <Col xs={24} md={{ span: 16, offset: 4 }}>
                    <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Col xs={24} md={{ span: 18 }} >
                            <Row>
                                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                    <Text strong><h3>{data.name}</h3></Text>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 16, style: { marginLeft: '30px' } }}>
                                    <Text strong><h4 style={{ color: '#FF8000' }}>{data.expectedSalary}</h4></Text>
                                </Col>
                            </Row>

                            <Row style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '5px' }}>
                                <Col xs={24} md={{ span: 5 }}><EnvironmentOutlined />{data.location}</Col>
                                <Col xs={24} md={{ span: 5 }}><CalendarOutlined />{data.experience}</Col>
                                <Col xs={24} md={{ span: 13 }}> <BankOutlined />{data.education?.[0].level} - {data.education?.[0].school}</Col>
                            </Row>
                        </Col>

                        <Col xs={12} md={{ span: 3 }}>
                            {collect ? <Button onClick={() => { setCollect(!collect) }} type="primary" ghost><HeartTwoTone />Save</Button> : <Button onClick={() => { setCollect(!collect) }}><HeartOutlined />Save</Button>}
                        </Col>
                        <Col xs={12} md={{ span: 3 }}>
                            <Button type='primary' style={{ marginLeft: '10px' }}><MessageOutlined />Chat</Button>
                        </Col>

                    </Row>
                    <Divider style={{ marginBottom: '10px' }} />
                    <Row>
                        <Title level={3}>Match Rate</Title>
                    </Row>
                    <Row>
                        <Col xs={24} md={{ span: 8 }}>
                            <Progress type="dashboard" percent={data.matchRate} />
                        </Col>
                        <Divider type="vertical" style={{ height: 'auto' }} />
                        <Col xs={24} md={{ span: 10, offset: 2 }}>
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

                    <Title level={3}>Experiences</Title>
                    <Col xs={24} md={{ span: 18 }}>
                        <Timeline
                            mode="left"
                            items={data.timeLine}
                        />
                    </Col>

                    <Title level={3}>Overall Score</Title>
                    <Row>
                        <Col xs={24} md={{ span: 8 }} >
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
                            <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
                                {data.review.desp}
                            </Row>
                        </Col>




                        <Divider type="vertical" style={{ height: 'auto' }} />
                        <Col xs={24} md={{ span: 10, offset: 2 }}>
                            {data.comments?.map((comment) => (
                                <Row key={comment.key}>
                                    <Col xs={24} md={{ span: 8 }}>
                                        <Text>{comment.key}</Text>
                                    </Col>
                                    <Col xs={24} md={{ span: 16 }}>
                                        <Tooltip title={comment.value}>
                                            <Progress percent={comment.value} showInfo={false} size="small" />
                                        </Tooltip>
                                    </Col>
                                </Row>
                            ))}

                        </Col>
                    </Row>

                    <Title level={3}>Recommend Explanation</Title>
                    <Text style={{ marginRight: '10px' }}>I recommend this talent, click here to see the explanations.</Text>
                    <MultiChoice btnClick={(val) => {
                        setCheckedList(val)
                        setIsModalOpen(!isModalOpen)
                        console.log(val)
                    }}></MultiChoice>
                </Col>
            </Card>
            <PopupModal show={isModalOpen} dataList={checkList} />
        </>
    )

}
export default DetailPage;