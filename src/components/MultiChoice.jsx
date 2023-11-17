/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Checkbox, Row, Col, Tooltip, Typography } from 'antd';
const { Text } = Typography;
// const CheckboxGroup = Checkbox.Group;
// const plainOptions = ['Input', 'Process', 'Output'];
const defaultCheckedList = ['Input'];
const MultiChoice = ({ btnClick }) => {
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const onChange = (list) => {
        setCheckedList(list.sort((a, b) => a - b));
    };
    const checkBtnClick = () => {
        // console.log(checkedList)
        btnClick(checkedList)
    }
    const options = [{
        key: 'input_click',
        name: 'Input',
        cnt: 1233
    }, {
        key: 'process_click',
        name: 'Process',
        cnt: 2343
    }, {
        key: 'output_click',
        name: 'Output',
        cnt: 5543
    }]
    return (
        <>
            <Row style={{ marginTop: '16px', alignItems: 'center', gap: '10px' }}>
                <Tooltip title="Select the type of the explanations" placement="bottom">
                    <Col>
                        Type:
                    </Col>
                </Tooltip>
                <Checkbox.Group
                    style={{ width: '100%' }}
                    onChange={onChange}
                >
                    {options.map((item) => {
                        return (
                            <Checkbox value={item.key} key={item.key}>
                                {item.name}
                                {/* <Text italic type="secondary"> ({item.cnt} reads)</Text> */}
                            </Checkbox>
                        )
                    })}
                </Checkbox.Group>
                {/* <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} /> */}
                <Button type='primary' onClick={checkBtnClick}>Check</Button>
            </Row>
        </>
    );
};
export default MultiChoice;