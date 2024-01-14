import React from "react";
import { Col, Row, Divider, Avatar, Progress, Typography } from "antd";

const { Text, Title } = Typography;
import ScoreCard from "./ScoreCard";
import AvatarItem from "./AvatarItem";
import HighlightCard from "./HighlightCard"


const MatchItem = () => {
  const UserIdx = "candidate B";
  const scoreList = [
    {
      selectID: 3,
      cols: ["0-33%", "34-67%", "68-100%"],
      desp: "Score",
      title: "Overall",
    },
    {
      selectID: 2,
      cols: ["No", "Maybe", "Yes"],
      desp: "Maybe",
      title: "Overall Recommendation",
    },
  ];

  const yoe = '5 years'
  const highlights = ['Contract Negotiation', 'CRM Software', 'Collaboration']
  const experiences = ['Sales Representative at Salesforce','Route Sales Assistant at UPS', 'Stanford University', 'Business Administration']

  return (
    <>
    <HighlightCard yoe={yoe} highlights={highlights} experiences={experiences}/>
      <Divider />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {scoreList.map((item, idx) => (
          <ScoreCard
            key={idx}
            selectID={item.selectID}
            cols={item.cols}
            desp={item.desp}
            title={item.title}
          />
        ))}
      </div>
    </>
  );
};

export default MatchItem;
