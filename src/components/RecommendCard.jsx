/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { Row, Col, Tag, Typography, Button, Divider, Rate, Progress, Timeline, Tooltip, Card } from 'antd';
import { EnvironmentOutlined, BankOutlined, CalendarOutlined } from '@ant-design/icons';
import { HeartOutlined, MessageOutlined, HeartTwoTone } from '@ant-design/icons';
const { Text, Title } = Typography;
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import MultiChoice from './MultiChoice';

import { UpdateSubjectOpt as UpdateSubjectApi } from '../services/user'


import { Modal } from 'antd';
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
                        <Title level={3}>
                            {/* {item}  */}
                            Reason {index + 1}
                        </Title>

                        <p>Lorem ipsum dolor sit amet, ea qui nullam altera molestiae. In esse scribentur usu. His dolore delectus et. Populo nonumes oporteat cu mel, et sit lorem suscipit invenire. Mea tota aperiri torquatos an, an illud facer recusabo vis. Vim ut labitur molestiae eloquentiam, oratio torquatos nam ad, tractatos moderatius ius ei.

                            Eos ut quaerendum scriptorem, usu tempor putant id, ex est ludus mucius oblique. Eum consul forensibus disputationi te. Nec feugiat invenire erroribus id, duo ei iudico constituam. Feugait probatus his no.</p>
                    </div>
                )
            })}
        </Modal>
    );
};


const RecommendCard = () => {
    const [collect, setCollect] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkList, setCheckedList] = useState([]);


    const storedUser = localStorage.getItem('userInfo');
    let userInfo = JSON.parse(storedUser)


    const updateToDatabase = async (checkData) => {


        let reqdata = {
            "user_id": Number(userInfo.subject_id),
            "user_name": userInfo.subject_name,
            "input_click": checkData.includes("input_click") ? 1 : 0,
            "process_click": checkData.includes("process_click") ? 1 : 0,
            "output_click": checkData.includes("output_click") ? 1 : 0
        }
        try {
            console.log("reqdata->", reqdata)
            let res = await UpdateSubjectApi(reqdata);
            // console.log(res)
            if (res.code != 0) {
                message.error(res.msg)
            }

        } catch (error) {
            console.log(error);
            message.error(error);
        }

    }


    return (
        <>
            <Card style={{ borderRadius: '20px', margin: '0 auto', width: "100%" }} >

                <Row justify="space-between">
                    <Col>

                        <Title level={3}>Recommend Explanation</Title>
                        <Text style={{ marginRight: '10px' }}>I recommend these talents, click here to see the explanations.</Text>

                    </Col>

                    <Col>
                        <MultiChoice btnClick={(val) => {
                            if (val.length === 0) {
                                return
                            }
                            setCheckedList(val)
                            setIsModalOpen(!isModalOpen)
                            updateToDatabase(val)
                         
                        }}></MultiChoice>
                    </Col>
                </Row>


            </Card>
            <PopupModal show={isModalOpen} dataList={checkList} />
        </>
    )

}
export default RecommendCard;