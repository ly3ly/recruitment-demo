import { Button, Card, Flex, Typography, Image, Row, Col } from 'antd';
import promotePic from '../assets/promote.webp';


const PromoteCard = () => {
    const cardStyle = {
        width: '100%',
    };
    const imgStyle = {
        display: 'block',
    };
    return (
        <Card
            // hoverable
            style={cardStyle}
            bodyStyle={{
                padding: 0,
                overflow: 'hidden',
            }}
        >
            {/* <Row>
                <Col span={6}>
                    <Image
                        preview={false}
                        alt="avatar"
                        src={promotePic}
                        // height={'100%'}
                        width={'250px'}
                        style={imgStyle}
                    />
                </Col>
                <Col span={18}>
                    <Row>
                        <Typography.Title level={3}>
                            <p>AI-empowered intelligent talent recommendation system.</p>
                            <p>Make employment more convenient and smart.</p>
                        </Typography.Title>
                    </Row>

                    <Button type="primary">
                        Get Start
                    </Button>
                </Col>
            </Row> */}
            <Flex justify="space-around">
                <Image
                    preview={false}
                    alt="avatar"
                    src={promotePic}
                    height={'100%'}
                    width={'250px'}
                    style={imgStyle}
                />
                <Flex
                    vertical
                    align="flex-end"
                    justify="space-between"
                    style={{
                        // padding: 32,
                    }}
                >
                    <Typography.Title level={3}>
                        <p>AI-empowered intelligent talent recommendation system.</p>
                        <p>Make employment more convenient and smart.</p>
                    </Typography.Title>
                    {/* <Button type="primary" style={{ marginBottom: 16 }}>
                        Get Start
                    </Button> */}
                </Flex>
            </Flex>
        </Card>
    )
}
export default PromoteCard;