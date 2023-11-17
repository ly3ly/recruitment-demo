import { useEffect, useState } from "react"
import { fetchCheck } from "../../api/check"




const SubjectList = () => {
    const [subjectList, setSubjectList] = useState([]);
    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        fetch('/backend/subjects', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Origin': 'https://recruitment-demo.vercel.app/'
            },
        }).then(res => res.json()) // 使用json()方法解析响应数据
            .then(data => {
                console.log(data); // 响应数据
                setSubjectList(data?.data);
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            {JSON.stringify(subjectList)}
        </>
    )
}

export default SubjectList