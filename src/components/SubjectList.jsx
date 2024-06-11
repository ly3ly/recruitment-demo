
import timestamp2timestring from "../services/time";

import { useEffect, useState } from "react"
import { Table, message } from "antd"
import { GetRecordList as GetSubjectOptListApi } from "../services/user"


/*
const data = [
    {
        "key": "e560fe6a02801872f495fafc20c875c1",
        "SerialUUID": "e560fe6a02801872f495fafc20c875c1",
        "UserId": 1,
        "UserName": "123123123123123123123232",
        "VisitTime": 1709708107,
        "LeaveTime": 1709709340,
        "VisitTime_t": 1233,
        "PageActiveTime_t": 1173,
        "VisitType": 1,
        "ExplainRecords": [
            {
                "ExplainOpenTime": 1709708164,
                "ExplainCloseTime": 1709708181,
                "ExplainTime_t": 17,
                "ExplainActiveTime_t": 17
            },
            {
                "ExplainOpenTime": 1709708164,
                "ExplainCloseTime": 1709708181,
                "ExplainTime_t": 17,
                "ExplainActiveTime_t": 17
            },
            {
                "ExplainOpenTime": 1709708164,
                "ExplainCloseTime": 1709708181,
                "ExplainTime_t": 17,
                "ExplainActiveTime_t": 17
            },
            {
                "ExplainOpenTime": 1709708164,
                "ExplainCloseTime": 1709708181,
                "ExplainTime_t": 17,
                "ExplainActiveTime_t": 17
            },
            {
                "ExplainOpenTime": 1709708164,
                "ExplainCloseTime": 1709708181,
                "ExplainTime_t": 17,
                "ExplainActiveTime_t": 17
            },
            {
                "ExplainOpenTime": 1709708164,
                "ExplainCloseTime": 1709708181,
                "ExplainTime_t": 17,
                "ExplainActiveTime_t": 17
            }
        ],
        "ExplainSumTime": 102,
        "ExplainSumActiveTime": 102
    }
]*/

const columns = [
    { width: '150px', align: "center", title: 'Operator', dataIndex: 'user_name', key: 'user_name' },
    { width: '150px', align: "center", title: 'Operate Index', dataIndex: 'serial_id', key: 'serial_id' },
    {
        align: "center", title: 'Explanation Type', dataIndex: 'visit_type', key: 'visit_type', filters: [
            {
                text: 'input-process-output',
                value: 1,
            },
            {
                text: 'input',
                value: 2,
            },
            {
                text: 'process',
                value: 3,
            },
            {
                text: 'output',
                value: 4,
            },
            {
                text: 'none',
                value: 5,
            },
            {
                text: 'input-process',
                value: 6,
            },
            {
                text: 'input-output',
                value: 7,
            },
            {
                text: 'process-output',
                value: 8,
            },
        ],
        onFilter: (value, record) => record.VisitType == value,
        sorter: (a, b) => a.VisitType - b.VisitType,
        render: (text) => <div>{text == 1 ? 'input-process-output' : text == 2 ? 'input' : text == 3 ? 'process' : text == 4 ? 'output' : text == 5 ? 'none' : text == 6 ? 'input-process' : text == 7 ? 'input-output' : text == 8 ? 'process-output' : 'undefined'}</div>,
    },
    {
        align: "center",
        title: 'Visit Time',
        dataIndex: 'page_enter_time',
        key: 'page_enter_time',
        sorter: (a, b) => a.page_enter_time - b.page_enter_time,
        render: (text) => <div>{timestamp2timestring(String(text))}</div>
    },
    {
        align: "center",
        title: 'Leave Time',
        dataIndex: 'page_leave_time',
        key: 'page_leave_time',
        sorter: (a, b) => a.page_leave_time - b.page_leave_time,
        render: (text) => <div>{timestamp2timestring(String(text))}</div>
    },
    {
        align: "center",
        title: 'Visit Duration',
        dataIndex: 'page_total_time',
        key: 'page_total_time',
        sorter: (a, b) => a.page_total_time - b.page_total_time,
        render: (text) => <div>{text}s</div>
    },
    {
        align: "center",
        title: 'Page Active Duration',
        dataIndex: 'page_active_time',
        key: 'page_active_time',
        sorter: (a, b) => a.page_active_time - b.page_active_time,
        render: (text) => <div>{text}s</div>
    },
    {
        align: "center",
        title: 'Explain Duration',
        dataIndex: 'explain_total_time',
        key: 'explain_total_time',
        sorter: (a, b) => a.explain_total_time - b.explain_total_time,
        render: (text) => <div>{text}s</div>
    },
    {
        align: "center",
        title: 'Explain Active Duration',
        dataIndex: 'explain_active_time',
        key: 'explain_active_time',
        sorter: (a, b) => a.explain_active_time - b.explain_active_time,
        render: (text) => <div>{text}s</div>
    },
];
const _columns = [
    { align: "center", title: 'Explain Open Time', dataIndex: 'ExplainOpenTime', key: 'ExplainOpenTime', render: (text) => <div>{timestamp2timestring(String(text))}</div> },
    { align: "center", title: 'Explain Close Time', dataIndex: 'ExplainCloseTime', key: 'ExplainCloseTime', render: (text) => <div>{timestamp2timestring(String(text))}</div> },
    {
        align: "center", title: 'Explain Duration', dataIndex: 'ExplainTime_t', key: 'ExplainTime_t', sorter: (a, b) => a.ExplainTime_t - b.ExplainTime_t,
        render: (text) => <div>{text}s</div>
    },
    {
        align: "center", title: 'Explain Active Duration', dataIndex: 'ExplainActiveTime_t', key: 'ExplainActiveTime_t', sorter: (a, b) => a.ExplainActiveTime_t - b.ExplainActiveTime_t,
        render: (text) => <div>{text}s</div>
    },
]

const SubjectList = () => {
    const [expandedRows, setExpandedRows] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        setLoading(true);
        try {
            let res = await GetSubjectOptListApi();
            setLoading(false);
            if (res.code != 0) {
                message.error(res.msg);
                return;
            }
            const listData = res.data.map(item => {
                return { ...item, key: item.serial_id };
            })

            setSubjectList(listData);

        } catch (error) {
            setLoading(false);
            console.log(error);
            message.error(error);

        }
    }

    const handleExpand = (expanded, record) => {
        // 判断是否展开或收起
        if (expanded) {
            // 将展开的行记录添加到 expandedRows 数组中
            setExpandedRows([...expandedRows, record.key]);
        } else {
            // 将收起的行记录从 expandedRows 数组中移除
            setExpandedRows(expandedRows.filter(key => key !== record.key));
        }
    };

    // 表格列配置


    // 扩展行渲染
    const expandedRowRender = (record) => {
        // const _data = record.ExplainRecords
        const _data = record.ExplainRecords.map((item, index) => {
            return { ...item, key: index };
        })

        return (
            <Table
                dataSource={_data}
                columns={_columns}
                pagination={false}
                size="small"
            />
        );
    };

    // 设置行可展开
    const rowExpandable = (record) => {
        return record.ExplainRecords?.length > 0;
    };

    return (
        <Table
            dataSource={subjectList}
            columns={columns}
            expandable={{ onExpand: handleExpand, expandedRowKeys: expandedRows, expandedRowRender }}
            rowExpandable={rowExpandable}
            pagination={false}
            key={'serial_id'}
            sticky style={{ marginTop: '20px' }} loading={loading}
        />
    );
};

export default SubjectList;