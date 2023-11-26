/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Divider, List, Modal, Row, theme } from 'antd';
import { Typography } from 'antd';
const { Text } = Typography;

import { Button, Checkbox, Form, Input } from 'antd';

import TalentCard from './TalentCard';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';

import { TalentData } from './talentData'
import PromoteCard from './PromoteCard';
import RecommendCard from './RecommendCard';



const TalentList = () => {
    const [subject, setSubject] = useState({});
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();
    const { setData } = useData();

    useEffect(() => {
        console.log("on load..")
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setSubject(JSON.parse(storedUser));
        }
        console.log(subject)
    }, [])

    const handleLogin = (userInfo) => {
        // 将用户信息保存到本地存储
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        // 更新状态以反映用户已登录
        setSubject(userInfo);
    };

    const handleClick = (item) => {
        // console.log(item)

        setData(item); // 将点击的项保存到Context中
        navigate('detail-page'); // 跳转到详情页面
    };

    const [showLoginModal, setShowLoginModal] = useState(true);

    if (!subject.subject_id) {
        // 如果用户未登录，显示登录组件
        const onFinish = (values) => {
            console.log(values);
            //請求後段登陸驗證，如果登陸成功，返回用戶信息

            handleLogin({
                subject_id: '123',
                subject_name: "test_name",
            });
            setShowLoginModal(false)

        };
        return (
            <>
                <Modal
                    width={'50%'}
                    title="Login Required"
                    open={showLoginModal}
                    footer={null}

                >
                    <Form
                        onFinish={onFinish}
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        style={{
                            marginTop: '60px',
                            maxWidth: 600,
                            margin: '0 auto',
                        }}
                        initialValues={{
                            remember: true,
                        }}

                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                offset: 6,
                                span: 18,
                            }}
                        >
                            <Text type="secondary">Will automatically register if record not found</Text>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 4,
                                span: 20,
                            }}
                        >
                            <Button type="primary" htmlType="submit" style={{ width: '80%', margin: '0 auto' }}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                </Modal>
            </>
        )
    }

    return (
        <>
            <PromoteCard />


            <div
                style={{
                    width: "70%",
                    display: "flex",
                    justifyContent: "center",
                    margin: "0 auto",
                    marginTop: "20px",
                    background: colorBgContainer
                }}
            >
                <RecommendCard data={subject}
                />
            </div>
            <Divider />





            <List
                style={{ width: '80%', display: 'flex', justifyContent: 'center', margin: '0 auto', background: colorBgContainer }}
                itemLayout="horizontal"
                dataSource={TalentData}
                renderItem={(item, index) => (
                    <List.Item onClick={() => handleClick(item)}>
                        <TalentCard
                            {...item} key={index}
                        />
                    </List.Item>
                )}
            >
            </List>
        </>
    )
}
export default TalentList;