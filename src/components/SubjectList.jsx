import { useEffect, useState } from "react"
import { Table, message } from "antd"
const { Column } = Table;
import { GetRecordList as GetSubjectOptListApi } from "../services/user"

import { useNavigate } from 'react-router-dom';


const SubjectList = () => {
    const [subjectList, setSubjectList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // const storedUser = localStorage.getItem('userInfo');
        // if (storedUser) {
        //     // setSubject(JSON.parse(storedUser));
        // } else {
        //     navigate('/');
        // }
        getData();
    }, [])

    const getData = async () => {
        setLoading(true);
        try {
            let res = await GetSubjectOptListApi();
            console.log(res);
            setLoading(false);
            if (res.code != 0) {
                message.error(res.msg);
                return;
            }

            setSubjectList(res.data);

        } catch (error) {
            setLoading(false);
            console.log(error);
            message.error(error);

        }
    }
    const columns = [
        {
            align: "center",
            title: 'Record Index',
            dataIndex: 'ID',
            key: 'ID',
            width: '150px',
            render: (text) => <a>{text}</a>,
        },
        {
            align: "center",
            title: 'Operator',
            dataIndex: 'UserName',
            key: 'UserName',
            width: '150px',
            render: (text) => <a>{text}</a>,
        },
        {
            align: "center",
            title: 'Operate Index',
            dataIndex: 'SerialUUID',
            key: 'SerialUUID',
            width: '170px',
        },
        {
            align: "center",
            title: 'Explanation Type',
            dataIndex: 'VisitType',
            key: 'VisitType',
            render: (text) => <div>{text == 1 ? 'input-process-output' : text == 2 ? 'input' : text == 3 ? 'process' : text == 4 ? 'output' : text == 5 ? 'none' : 'undefined'}</div>,
        },
        {
            align: "center",
            title: 'Visit Time',
            dataIndex: 'VisitTime_t',
            key: 'VisitTime_t',
            render: (text) => <div>{text}s</div>
        },
        {
            align: "center",
            title: 'Explain Time',
            dataIndex: 'ExplainTime_t',
            key: 'ExplainTime_t',
            render: (text) => <div>{text}s</div>
        },
        {
            align: "center",
            title: 'Record Time',
            dataIndex: 'UpdatedAt',
            key: 'UpdatedAt'
        },
        // {
        //     align: "center",
        //     title: 'Operate Time',
        //     dataIndex: 'OperateTime',
        //     key: 'OperateTime',
        //     render: (text) => <a style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{new Date(text * 1000).toLocaleDateString("en-US")} - {new Date(text * 1000).toLocaleTimeString("it-IT")}</a>,
        // }
    ]
    return (
        <>
            <Table dataSource={subjectList} columns={columns} pagination={false} sticky style={{ marginTop: '20px' }} loading={loading} />
        </>
    )
}

export default SubjectList