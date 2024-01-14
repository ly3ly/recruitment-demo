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
    // const [subject, setSubject] = useState({});
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();
    const { setData } = useData();

    useEffect(() => {
        console.log("on load..")
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            // setSubject(JSON.parse(storedUser));
        } else {
            navigate('/');
        }
    }, [])

    const handleClick = (item) => {
        // console.log(item)

        setData(item); // 将点击的项保存到Context中
        navigate('/home/detail-page'); // 跳转到详情页面
    };
   
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
                <RecommendCard
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