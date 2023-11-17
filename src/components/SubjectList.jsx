import { useEffect, useState } from "react"
import { fetchCheck } from "../../api/check"




const SubjectList = () => {
    const [subjectList, setSubjectList] = useState([]);
    useEffect(() => {
        getData();
        // console.log(data)
        // setSubjectList(data)
    }, [])

    // const getData = async () => {
    //     let response;
    //     try {
    //         response = await fetchCheck();
    //     } catch (error) {
    //         response = error
    //     }
    //     return response

    // }
    const getData = () => {
        fetch('/backend/subjects', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Origin': 'https://recruitment-demo.vercel.app/'
            },
        }).then(res => {
            console.log(res)
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