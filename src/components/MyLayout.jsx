import { Layout, Menu, theme, FloatButton, Typography, Button } from 'antd';
const { Header, Content, Footer } = Layout;
import { CommentOutlined, CustomerServiceOutlined, RobotOutlined } from '@ant-design/icons';

const { Text } = Typography;
const MyLayout = ({ children }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={[
                        {
                            key: '1',
                            label: 'Home',
                        },
                        {
                            key: '2',
                            label: 'Recommend Talents',
                        }
                    ]}
                />
                <Text style={{ marginLeft: 'auto', paddingRight: '20px' }}><a style={{ color: 'white' }}>Hire now</a></Text>
                <Button type="primary" ghost >
                    <Text style={{ color: 'white' }}>Login</Text>
                </Button>

            </Header>
            {/* <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={new Array(15).fill(null).map((_, index) => {
                        const key = index + 1;
                        return {
                            key,
                            label: `nav ${key}`,
                        };
                    })}
                />
            </Header> */}
            <Content
                style={{
                    padding: '0 50px',
                    background: colorBgContainer,
                }}
            >

                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    background: colorBgContainer,
                }}
            >
                Department of Information Systems ©2023 City University of Hong Kong
            </Footer>

            <FloatButton.Group
                trigger="click"
                type="primary"
                style={{
                    right: 24,
                }}
                icon={<RobotOutlined />}
            >
                <FloatButton />
                {/* <FloatButton icon={<CommentOutlined />} /> */}
            </FloatButton.Group>

            {/* <FloatButton.Group
                trigger="hover"
                type="primary"
                style={{
                    right: 94,
                }}
                icon={<CustomerServiceOutlined />}
            >
                <FloatButton />
                <FloatButton icon={<CommentOutlined />} />
            </FloatButton.Group> */}
        </Layout>
    );
};
export default MyLayout;