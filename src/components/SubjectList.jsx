import { useEffect, useState } from "react"
import { fetchCheck } from "../../api/check"




const SubjectList = () => {
    const [subjectList, setSubjectList] = useState([]);
    useEffect(() => {
        let data = getData();
        console.log(data)
        setSubjectList(data)
    }, [])

    const getData = async () => {
        let response;
        try {
            response = await fetchCheck();
        } catch (error) {
            response = error
        }
        return response

    }

    return (
        <>
            {JSON.stringify(subjectList)}
        </>
    )
}

export default SubjectList