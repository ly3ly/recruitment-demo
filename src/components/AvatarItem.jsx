import React from "react";
import { Col, Row, Divider, Avatar, Progress, Typography } from "antd";

const { Text, Title } = Typography;
import { UserOutlined } from "@ant-design/icons";

const AvatarItem = ({candidate_name,match_rate}) => {

  return (
    <>
      <div style={{display:"flex",flexDirection:'row',justifyContent:'center'}}>
        <Avatar style={{marginTop:'50px'}} size={150} icon={<UserOutlined />} />
        <div
          style={{
            marginLeft:'10px',
            display: "flex",
            flexDirection: "column",
            alignItems:'center'
          }}
        >
          <Text strong>Match Rate</Text>
          <Progress
            size={60}
            type="dashboard"
            percent={match_rate}
            gapDegree={1}
            gapPosition="bottom"
          />
          <Divider style={{ marginTop: "0", marginBottom: "5px" }} />
          <Text strong style={{ fontSize: "16px",marginTop:'25px' }}>
            {candidate_name}
          </Text>
        </div>

      </div>

    </>
  );
};

export default AvatarItem;
