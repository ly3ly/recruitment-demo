import { useEffect, useState } from "react"
import { Table, message } from "antd"
const { Column } = Table;
import { GetSubjectOptList as GetSubjectOptListApi } from "../services/user"



const SubjectList = () => {
    const [subjectList, setSubjectList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
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

        // fetch('/backend/subjects', {
        //     method: 'GET',
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //         'Origin': 'https://recruitment-demo.vercel.app/'
        //     },
        // }).then(res => res.json()) // 使用json()方法解析响应数据
        //     .then(data => {
        //         console.log(data); // 响应数据
        //         setLoading(false);
        //         setSubjectList(data?.data);
        //     }).catch(err => {
        //         console.log(err)
        //         setLoading(false);
        //     })
    }
    const columns = [
        {
            align: "center",
            title: 'Subject ID',
            dataIndex: 'UserId',
            key: 'UserId',
            render: (text) => <a>{text}</a>,
        },
        {
            align: "center",
            title: 'Subject Name',
            dataIndex: 'UserName',
            key: 'UserName',
            render: (text) => <a>{text}</a>,
        },
        {
            align: "center",
            title: 'Input Check',
            dataIndex: 'InputCheck',
            key: 'InputCheck',
        },
        {
            align: "center",
            title: 'Process Check',
            dataIndex: 'ProcessCheck',
            key: 'ProcessCheck',
        },
        {
            align: "center",
            title: 'Output Check',
            dataIndex: 'OutputCheck',
            key: 'OutputCheck',
        },
        {
            align: "center",
            title: 'Operate Time',
            dataIndex: 'OperateTime',
            key: 'OperateTime',
            render: (text) => <a style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{new Date(text * 1000).toLocaleDateString("en-US")} - {new Date(text * 1000).toLocaleTimeString("it-IT")}</a>,
        }
    ]
    return (
        <>
            <Table dataSource={subjectList} columns={columns} pagination={false} sticky style={{ marginTop: '20px' }} loading={loading} />
        </>
    )
}

export default SubjectList