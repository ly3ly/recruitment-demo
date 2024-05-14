import { Layout, Menu, theme, FloatButton, Typography, Button } from 'antd';
const { Header, Content, Footer } = Layout;
import { CommentOutlined, CustomerServiceOutlined, RobotOutlined } from '@ant-design/icons';
import { Logout as LogoutApi } from '../services/user'
import { useNavigate } from "react-router-dom";
import { setToken } from '../services/tools';
import { UpdateOptTime as UpdateTimeApi } from "../services/user";
import { VISIT_TYPE } from "../services/user";
const { Text } = Typography;
import { useEffect, useState } from "react";
const MyLayout = ({ children }) => {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        const storedUser = localStorage.getItem("userInfo");
        setUserInfo(JSON.parse(storedUser))
    }, []);

    const userLogoutFcn = async () => {


        try {
            let time_res = await UpdateTimeApi({
                user_id: userInfo.subject_id,
                user_name: userInfo.subject_name,
                serial_uuid: userInfo.serial_uuid,
                visit_type: VISIT_TYPE,
                time_type: 2,
            });
            if (time_res.code != 0) {
                console.log('update time error...', time_res)
            }
        } catch (error) {
            console.log('update time error...', error)
        }

        // let res = await LogoutApi();
        // console.log(res);
        localStorage.removeItem('userInfo');
        setToken('');
        navigate('/');
    }


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
                    selectable={false}
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
                <Button type="primary" ghost onClick={userLogoutFcn}>
                    <Text style={{ color: 'white' }}>Logout</Text>
                </Button>

            </Header>

            <Content
                style={{
                    padding: '0 50px',
                    background: colorBgContainer,
                    width: '100%',
                }}
            >

                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                        width: '100%',
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
                Department of Information Systems ©2024 City University of Hong Kong
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