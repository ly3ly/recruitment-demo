import { List, theme } from 'antd';
import TalentCard from './TalentCard';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';

import { TalentData } from './talentData'
import PromoteCard from './PromoteCard';



const TalentList = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();
    const { setData } = useData();

    const handleClick = (item) => {
        console.log(item)

        setData(item); // 将点击的项保存到Context中
        navigate('detail-page'); // 跳转到详情页面
    };

    return (
        <>
            <PromoteCard />
            <List
                style={{ width: '80%', display: 'flex', justifyContent: 'center', margin: '0 auto', background: colorBgContainer }}
                itemLayout="horizontal"
                dataSource={TalentData}
                renderItem={(item, index) => (
                    <List.Item onClick={() => handleClick(item)}>
                        <TalentCard
                            {...item} key={index}
                        />
                    </List.Item>
                )}
            >
            </List>
        </>
    )
}
export default TalentList;