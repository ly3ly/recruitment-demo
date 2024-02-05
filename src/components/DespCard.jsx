import ScoreCard from "./ScoreCard";
import { Col, Row } from "antd";

const DespCard = ({ h1title, h1desp, list, cols }) => {
  return (
    <>
      <Row
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h3>{h1title}</h3>
      </Row>
      <Row style={{ display: "flex", justifyContent: "center" }}>{h1desp}</Row>

      <Row
        style={{
          marginTop: "10px",
          marginBottom: '30px',
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {list.map((item, idx) => (
          <Col key={idx} style={{ width: "290px" }}>
            <ScoreCard selectID={item} cols={cols}></ScoreCard>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default DespCard;
