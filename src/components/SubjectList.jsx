import { useEffect, useState } from "react"
import { Table } from "antd"
const { Column } = Table;



const SubjectList = () => {
    const [subjectList, setSubjectList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        setLoading(true);
        fetch('/backend/subjects', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Origin': 'https://recruitment-demo.vercel.app/'
            },
        }).then(res => res.json()) // 使用json()方法解析响应数据
            .then(data => {
                console.log(data); // 响应数据
                setLoading(false);
                setSubjectList(data?.data);
            }).catch(err => {
                console.log(err)
                setLoading(false);
            })
    }
    return (
        <>
            {/* {JSON.stringify(subjectList)} */}
            <Table dataSource={subjectList} pagination={false} sticky style={{ marginTop: '20px' }} loading={loading}>
                <Column title="Subject ID" dataIndex="subject_id" key="subject_id"
                    render={(subject_id) => <a >{subject_id}</a>} />
                <Column align="center" title="Input Click" dataIndex="input_click" key="input_click" />
                <Column align="center" title="Process Click" dataIndex="process_click" key="process_click" />
                <Column align="center" title="Output Click" dataIndex="output_click" key="output_click" />
            </Table>
        </>
    )
}

export default SubjectList