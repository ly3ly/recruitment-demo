/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { Row, Col, Tag, Typography, Button, Divider, Rate, Progress, Timeline, Tooltip, Card } from 'antd';
const { Text, Title } = Typography;
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


const ExplanationCard = ({isShow}) => {


    return (
        <>
            <PopupModal show={isShow} dataList={[1,2,3]} />
        </>
    )

}
export default ExplanationCard;