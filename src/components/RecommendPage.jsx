import { useEffect, useState } from "react";
import {
  Table,
  message,
  Space,
  Typography,
  Divider,
  Button,
  Modal,
} from "antd";
const { Text, Title } = Typography;
const { Column } = Table;
import ScoreCard from "./ScoreCard";
import HighlightCard from "./HighlightCard";
import AvatarItem from "./AvatarItem";
import DespCard from "./DespCard";
import { Col, Row, Card } from "antd";
import explainIMG from "../assets/explain.svg";
import { UpdateOptTime as UpdateTimeApi } from "../services/user";
import { VISIT_TYPE } from "../services/user";
import { getToken, wsUrl } from "../services/tools";
import PromoteCard from './PromoteCard'

const CandidateCard = ({ candidate_name, match_rate, sid1, sid2, desp2 }) => {
  return (
    <Col style={{ width: "500px" }}>
      <AvatarItem candidate_name={candidate_name} match_rate={match_rate} />
      <ScoreCard
        selectID={sid1}
        cols={["0-33%", "34-67%", "68-100%"]}
        desp=""
        title="Overall Score"
      />
      <p style={{ marginTop: 0, marginBottom: "10px" }}>
        <Text strong>Higher Tier</Text>
      </p>
      <Text>Overall:</Text>{" "}
      <Text strong>{desp2}</Text>

      {/* <ScoreCard
        selectID={sid2}
        // cols={["0-33%", "34-67%", "68-100%"]}
        cols={["Not Recommend","Recommend","Highly Recommend"]}
        desp={desp2}
        title="Overall Recommendation"
      /> */}
    </Col>
  );
};

const talentList = [
  {
    name: "A",
    match_rate: "93",
    sid1: 3,
    sid2: 2,
    desp2: "Not Recommend",
    cv: {
      title: "CV Score",
      desp: "91%",
      selectID: 5,
      cols: ["0-20", "21-40", "41-60", "61-80", "81-100"],
    },
    yoe: "5 years",
    highlights: ["Contract Negotiation", "CRM Software", "Cold-prospecting"],
    experiences: [
      "Sales Representative",
      "at Best Buy,",
      "Entry level Sales Representative",
      "at Salesforce,",
      "Arizona State University,",
      "Business Administration",
    ],
    game: {
      title: "Game Score",
      desp: "98%",
      selectID: 5,
      cols: ["0-20", "21-40", "41-60", "61-80", "81-100"],
    },
    video: {
      title: "Video Interview Score",
      desp: "92%",
      selectID: 5,
      cols: ["0-20", "21-40", "41-60", "61-80", "81-100"],
    },
  },
  {
    name: "B",
    match_rate: "94",
    sid1: 3,
    sid2: 2,
    desp2: "Not Recommend",
    cv: {
      title: "CV Score",
      desp: "92%",
      selectID: 5,
      cols: ["0-20", "21-40", "41-60", "61-80", "81-100"],
    },
    yoe: "5 years",
    highlights: ["Contract Negotiation", "CRM Software", "Collaboration"],
    experiences: [
      "Sales Representative",
      "at Salesforce,",
      "Route Sales Assistant at UPS,",
      "Stanford University,",
      "Business Administration",
    ],
    game: {
      title: "Game Score",
      desp: "95%",
      selectID: 5,
      cols: ["0-20", "21-40", "41-60", "61-80", "81-100"],
    },
    video: {
      title: "Video Interview Score",
      desp: "95%",
      selectID: 5,
      cols: ["0-20", "21-40", "41-60", "61-80", "81-100"],
    },
  },
  {
    name: "C",
    match_rate: "95",
    sid1: 3,
    sid2: 2,
    desp2: "Recommend",
    cv: {
      title: "CV Score",
      desp: "96%",
      selectID: 5,
      cols: ["0-20", "21-40", "41-60", "61-80", "81-100"],
    },
    yoe: "7 years",
    highlights: ["Contract Negotiation", "CRM Software", "Collaboration"],
    experiences: [
      "Sales Representative",
      "at FedEx,",
      "Sales Representative at P&G,",
      "University of California,",
      "San Diego,",
      "Marketing",
    ],
    game: {
      title: "Game Score",
      desp: "95%",
      selectID: 5,
      cols: ["0-20", "21-40", "41-60", "61-80", "81-100"],
    },
    video: {
      title: "Video Interview Score",
      desp: "95%",
      selectID: 5,
      cols: ["0-20", "21-40", "41-60", "61-80", "81-100"],
    },
  },
  {
    name: "D",
    match_rate: "97",
    sid1: 3,
    sid2: 3,
    desp2: "Highly Recommend",
    cv: {
      title: "CV Score",
      desp: "96%",
      selectID: 5,
      cols: ["0-20", "21-40", "41-60", "61-80", "81-100"],
    },
    yoe: "7 years",
    highlights: [
      "Contract Negotiation",
      "CRM Software",
      "Market Research & Analysis",
    ],
    experiences: [
      "Customer Sales Representative",
      "at DHL,",
      "Sales Representative at Unilever,",
      "Standford University,",
      "Business Analysis, Marketing",
    ],
    game: {
      title: "Game Score",
      desp: "98%",
      selectID: 5,
      cols: ["0-20", "21-40", "41-60", "61-80", "81-100"],
    },
    video: {
      title: "Video Interview Score",
      desp: "98%",
      selectID: 5,
      cols: ["0-20", "21-40", "41-60", "61-80", "81-100"],
    },
  },
];

const JobDataSource = [
  {
    key: "1",
    JobTitle: "Sales Representative",
    Department: "Sales",
    OpeningPosition: 1,
  },
];

const JobColumns = [
  {
    title: "Job Title",
    dataIndex: "JobTitle",
    key: "JobTitle",
  },
  {
    title: "Department",
    dataIndex: "Department",
    key: "Department",
  },
  {
    title: "Opening Position",
    dataIndex: "OpeningPosition",
    key: "OpeningPosition",
  },
];

const RecommendPage = () => {
  const [showExplain, setShowExplain] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    setUserInfo(JSON.parse(storedUser))

    const ws = new WebSocket(wsUrl);

    ws.onopen = function (event) {
      console.log('connected');
      var msg = getToken();
      console.log(event.data, msg);
      if (msg != "") {
        ws.send(getToken());
      }
    }
    ws.onmessage = function (event) {
      var msg = getToken();
      console.log(event.data, msg);
      if (msg != "") {
        ws.send(getToken());
      }
    };
    return () => {
      ws.close();
    };

  }, []);

  // useEffect(() => {
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);


  useEffect(() => {

  }, []);

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = "";
    const storedUser = localStorage.getItem("userInfo");
    setUserInfo(JSON.parse(storedUser))
    console.log("userInfo", userInfo);
    try {
      UpdateTimeApi({
        user_id: userInfo.subject_id,
        user_name: userInfo.subject_name,
        serial_uuid: userInfo.serial_uuid,
        visit_type: VISIT_TYPE,
        time_type: 2,
      })
        .then((time_res) => {
          if (time_res.code !== 0) {
            console.log('update time1 error...', time_res);
          }

          if (showExplain) {
            UpdateTimeApi({
              user_id: userInfo.subject_id,
              user_name: userInfo.subject_name,
              serial_uuid: userInfo.serial_uuid,
              visit_type: VISIT_TYPE,
              time_type: 4,
            })
              .then((time_res2) => {
                if (time_res2.code !== 0) {
                  console.log('update time2 error...', time_res2);
                }
              })
              .catch((error) => {
                console.log('update time2 error...', error);
              });
          }
        })
        .catch((error) => {
          console.log('update time1 error...', error);
        });
    } catch (error) {
      console.log('update time error...', error);
    }

  }

  return (
    <>
     {/* <Modal title="Basic Modal" 
     width="80%"
     footer={null}
        maskClosable={false}
     open>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}

      <Modal
        width="80%"
        open={showExplain}
        footer={null}
        maskClosable={false}
        afterClose={async () => {
          console.log('modal is closed...')
          try {
            let time_res = await UpdateTimeApi({
              user_id: userInfo.subject_id,
              user_name: userInfo.subject_name,
              serial_uuid: userInfo.serial_uuid,
              visit_type: VISIT_TYPE,
              time_type: 4,
            });
            if (time_res.code != 0) {
              console.log('update time error...', time_res)
            }
          } catch (error) {
            console.log('update time error...', error)
          }
        }}
        onCancel={() => {
          setShowExplain(false);

        }}
        // style={{ maxHeight: "80vh", overflow: "scroll" }}
      >
        {VISIT_TYPE == 1 || VISIT_TYPE == 2 ? <div> {VISIT_TYPE==1?<Title level={3}>Input Explanation:</Title>:null}
          <p style={{ textAlign: "justify" }}>
            This AI hiring system employs a range of input, from CV screening to
            interactive evaluations such as game-based assessment and video
            interview assessment. By analyzing this information, the AI system
            aims to compare the qualities of successful employees with those of
            job candidates to determine the candidates' potential level.
          </p>
          <p style={{ textAlign: "justify" }}>
            Overall, the AI hiring system is capable of forming a comprehensive
            profile for each candidate by leveraging diverse data sources,
            including CV details, game-based assessment, and video interview
            assessment. By capturing the essence of what makes current employees
            successful and matching those traits with the profiles of candidates,
            the AI system offers a predictive insight into the future performance
            of candidates. This helps identify suitable candidates who align with
            organizational requirements and exhibit desired traits.
          </p></div> : null}

        {/* <Title level={3}>Input Explanation:</Title>
        <p style={{ textAlign: "justify" }}>
          This AI hiring system employs a range of input, from CV screening to
          interactive evaluations such as game-based assessment and video
          interview assessment. By analyzing this information, the AI system
          aims to compare the qualities of successful employees with those of
          job candidates to determine the candidates' potential level.
        </p>
        <p style={{ textAlign: "justify" }}>
          Overall, the AI hiring system is capable of forming a comprehensive
          profile for each candidate by leveraging diverse data sources,
          including CV details, game-based assessment, and video interview
          assessment. By capturing the essence of what makes current employees
          successful and matching those traits with the profiles of candidates,
          the AI system offers a predictive insight into the future performance
          of candidates. This helps identify suitable candidates who align with
          organizational requirements and exhibit desired traits.
        </p> */}

        {VISIT_TYPE == 1 || VISIT_TYPE == 3 ? <div>

        {VISIT_TYPE==1?<Title level={3}>Process Explanation:</Title>:null}

          <p style={{ textAlign: "justify" }}>
            The AI recruitment system can simulate human cognitive functions to
            sift through vast numbers of candidates and pinpoint those most likely
            to excel in a given role by utilizing machine learning (ML) which is a
            subset of AI. Machine learning techniques, such as Natural Language
            Processing (NLP) and predictive analytics, are integral to this
            approach, enabling a nuanced analysis of a candidate's potential based
            on a variety of complex datasets.
          </p>
          <p style={{ textAlign: "justify" }}>
            Overall, the AI hiring system uses machine learning to automate the
            hiring process. It parses and interprets vast amounts of data—from the
            syntactic structure of CV content to the strategic decision-making
            captured in game-based assessments and the nuanced behaviors exhibited
            in a video interview—providing a holistic assessment of each
            candidate.
          </p></div> : null}


        {VISIT_TYPE == 1 || VISIT_TYPE == 4 ? <div>
          {VISIT_TYPE==1?<Title level={3}>Output Explanation:</Title>:null}
          <p style={{ textAlign: "justify" }}>
            Through the AI hiring system's comprehensive evaluation, four
            candidates A, B, C, and D were assessed via CV screening, game-based
            assessment, and video interview assessment. Candidates C and D both
            impressed with their CV scores at 96%, although A and B was not far
            behind with above 90% score. In the game-based assessments, candidates
            A and D stood out with top scores of 98%. In the video interviews, all
            candidates showed strong performance with all scores above 90%, with D
            excelling at 98%. Candidate D's overall match score, a robust 97%
            average from CV screening, game-based assessment, and video interview,
            highlighted D’s exceptional fit for the Sales Representative role.
          </p>
          <p style={{ textAlign: "justify" }}>
            In conclusion, the AI system illuminates Candidate D as the primary
            selection for the sales representative role. Surpassing the rest with
            an extensive skill set and superior performance in all assessments,
            Candidate D is marked as the leading choice. With an exemplary CV,
            superior cognitive abilities from game-based assessment and
            outstanding communication skills in video interview assessment,
            Candidate D surpasses the multifaceted demands of the role. Alongside
            a strong cultural fit, Candidate D is well-equipped to make meaningful
            contributions to the organization.
          </p>
        </div> : null}

      </Modal>

      <div style={{ margin: "20px" }}>
        <PromoteCard></PromoteCard>
        <Divider></Divider>
        <div style={{ margin: "auto", width: "60%" }}>
          <Table
            pagination={false}
            dataSource={JobDataSource}
            columns={JobColumns}
          />
          <Divider></Divider>
          <Card title="Job Description">
            <Row>
              <Space>
                <Text strong>Job Title:</Text>
                <Text>Sales Representative</Text>
              </Space>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Space>
                <Text strong>Department:</Text>
                <Text>Sales</Text>
              </Space>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Space>
                <Text strong>Job Summary</Text>
              </Space>
            </Row>
            <Row>
              <Text>
                We are looking for a Sales Representative to join our team,
                focusing on market analysis and customer engagement to drive
                sales growth.
              </Text>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Space>
                <Text strong>Key Responsibilities</Text>
              </Space>
            </Row>
            <Row>
              <Text>• Develop sales strategies based on market research.</Text>
            </Row>
            <Row>
              <Text>
                • Build strong customer relationships and manage accounts.
              </Text>
            </Row>
            <Row>
              <Text>• Meet or exceed sales targets.</Text>
            </Row>
            <Row>
              <Text>
                • Provide insights to the team from customer feedback and sales
                trends.
              </Text>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Space>
                <Text strong>Qualifications</Text>
              </Space>
            </Row>
            <Row>
              <Text>• Proven sales experience.</Text>
            </Row>
            <Row>
              <Text>• Strong analytical and communication skills.</Text>
            </Row>
            <Row>
              <Text>• Familiarity with our CRM and sales reporting tools.</Text>
            </Row>
          </Card>
        </div>
        <Divider></Divider>
        <Row>
          <Col>
            <h2>AI's Recommendation</h2>
          </Col>
          {VISIT_TYPE == 5 ? null : <Col span={10} offset={4}>
            <Card>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "20px",
                }}
              >


                <Row style={{ alignItems: "center", gap: "20px" }}>
                  <img src={explainIMG} width={100}></img>
                  <Button
                    type="primary"
                    size="large"
                    style={{fontSize:'28px',padding:'30px 24px', display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'}}
                    onClick={async () => {
                      setShowExplain(true);
                      try {
                        let time_res = await UpdateTimeApi({
                          user_id: userInfo.subject_id,
                          user_name: userInfo.subject_name,
                          serial_uuid: userInfo.serial_uuid,
                          visit_type: VISIT_TYPE,
                          time_type: 3,
                        });
                        if (time_res.code != 0) {
                          console.log('update time error...', time_res)
                        }
                      } catch (error) {
                        console.log('update time error...', error)
                      }
                    }}
                  >
                    Explanation
                  </Button>
                </Row>
                <Text strong>
                  {" "}
                  To give you a better understanding of AI's recommendation, please click the {" "}“
                  <Text style={{ color: "red" }}>
                  Explanation
                  </Text>”{" "}
                  button.
                </Text>
              </div>
            </Card>
          </Col>}

        </Row>

 <div
 style={{
  borderRadius: "20px",
  padding: "5px 20px",
  margin: "10px 40px",
  marginBottom:"30px"
}}
 >

 </div>

        <div
          style={{
            border: "1px solid black",
            borderRadius: "20px",
            padding: "5px 20px",
            margin: "10px 40px",
          }}
        >

<h3>Report summary:</h3>

<Row>
  <Text>
    According to the AI hiring system's analysis,{" "}
    <Text strong underline>
      Candidate D
    </Text>{" "}
    will perform well in the further for the Sales Representative Position after joining the company,
    compared to Candidate A, B and C. Therefore, it is recommended that your company should offer the job to{" "}
    <Text strong underline>
      Candidate D
    </Text>.
  </Text>
</Row>

<Row>
  <Text >
    <Text strong underline>
    The overall performance
    </Text> {" "} of four candidates evaluated by AI is as bellows. 
  </Text>
</Row>

          <h3>Overall Performance</h3>
          <Row style={{ justifyContent: "space-around", marginBottom: "20px" }}>
            {talentList.map((item, idx) => (
              <CandidateCard
                key={idx}
                candidate_name={item.name}
                match_rate={item.match_rate}
                sid1={item.sid1}
                sid2={item.sid2}
                desp2={item.desp2}
              />
            ))}
          </Row>
        </div>

        <div
          style={{
            border: "1px solid black",
            borderRadius: "20px",
            padding: "20px 20px",
            margin: "20px 40px",
          }}
        >
          <div >
          <Text strong style={{fontSize:'20px'}}>
            {" "}
            The following is the{" "}
            <Text style={{ color: "red",fontSize:'20px' }}>individual detailed score</Text> for
            the CV, game-based assessment, and video interview assessment, all
            of which contribute to the overall score provided by AI.
          </Text>
          </div>
        </div>

        <Divider></Divider>

        <Row>
          <h2>Detailed Score</h2>
        </Row>
        <div
          style={{
            border: "1px solid black",
            borderRadius: "20px",
            padding: "20px 20px",
            margin: "20px 40px",
            paddingBottom: "60px",
            marginBottom: "100px",
          }}
        >
          <Row style={{ justifyContent: "space-around", marginBottom: "20px" }}>
            {talentList.map((item, idx) => (
              <AvatarItem
                key={idx}
                candidate_name={item.name}
                match_rate={item.match_rate}
              />
            ))}
          </Row>
          <h3>CV Screening</h3>
          <Row style={{ justifyContent: "space-around", marginBottom: "20px" }}>
            {talentList.map((item, idx) => (
              <Col key={idx} style={{ width: "275px" }}>
                <ScoreCard
                  selectID={item.cv.selectID}
                  cols={item.cv.cols}
                  desp={item.cv.desp}
                  title={item.cv.title}
                />
                <Divider></Divider>
                <HighlightCard
                  yoe={item.yoe}
                  highlights={item.highlights}
                  experiences={item.experiences}
                />
              </Col>
            ))}
          </Row>
          <Divider></Divider>
          <h3>Game Assessment</h3>
          <Row style={{ justifyContent: "space-around", marginBottom: "20px" }}>
            {talentList.map((item, idx) => (
              <Col key={idx} style={{ width: "275px" }}>
                <ScoreCard
                  selectID={item.game.selectID}
                  cols={item.game.cols}
                  desp={item.game.desp}
                  title={item.game.title}
                />
                <Divider></Divider>
              </Col>
            ))}
          </Row>
          <DespCard
            h1title="Problem-Solving"
            h1desp="Recognizes and assesses problems, determines causal factors, and devises solutions for them. Pinpoints problem areas and employs suitable techniques to resolve them."
            list={[5, 5, 4, 5]}
            cols={[
              "Novice",
              <Row key="Developing" style={{ marginTop: "15px" }}></Row>,
              "Intermediate",
              <Row key="Advanced" style={{ marginTop: "15px" }}></Row>,
              "Expert",
            ]}
          />
          <DespCard
            h1title="Job-related Traits"
            h1desp="Remains controls in the face of pressure, complaints or failure and has the ability to think rational despite pressure. Can cope well with irritable customers or co-workers."
            list={[4, 4, 4, 4]}
            cols={[
              "Novice",
              <Row style={{ marginTop: "15px" }}></Row>,
              "Intermediate",
              <Row style={{ marginTop: "15px" }}></Row>,
              "Expert",
            ]}
          />
          <DespCard
            h1title="Perceptual and Processing Speed"
            h1desp="Recognizes the importance of swift and accurate understanding, analysis, and response to information."
            list={[5, 4, 5, 5]}
            cols={[
              "Novice",
              <Row style={{ marginTop: "15px" }}></Row>,
              "Intermediate",
              <Row style={{ marginTop: "15px" }}></Row>,
              "Expert",
            ]}
          />
          <Divider></Divider>
          <h3>Video Interview Assessment</h3>
          <Row style={{ justifyContent: "space-around", marginBottom: "20px" }}>
            {talentList.map((item, idx) => (
              <Col key={idx} style={{ width: "275px" }}>
                <ScoreCard
                  selectID={item.video.selectID}
                  cols={item.video.cols}
                  desp={item.video.desp}
                  title={item.video.title}
                />
                <Divider></Divider>
              </Col>
            ))}
          </Row>
          <DespCard
            h1title="Communication Skills"
            h1desp="Delivers messages in a comprehensible and persuasive way, ensuring shared understanding. Skillfully adapts communication to fit the audience."
            list={[4, 5, 4, 5]}
            cols={[
              "Novice",
              <Row style={{ marginTop: "15px" }}></Row>,
              "Intermediate",
              <Row style={{ marginTop: "15px" }}></Row>,
              "Expert",
            ]}
          />
          <DespCard
            h1title="Sales Skills"
            h1desp="Communicates effectively the value proposition of a product or service in a compelling manner."
            list={[4, 4, 4, 4]}
            cols={[
              "Novice",
              <Row style={{ marginTop: "15px" }}></Row>,
              "Intermediate",
              <Row style={{ marginTop: "15px" }}></Row>,
              "Expert",
            ]}
          />
          <DespCard
            h1title="Cultural Fit"
            h1desp="Exhibits a clear understanding and inherent alignment with the company's values and work culture, suggesting a potential seamless integration into the organizaitonal environment."
            list={[4, 4, 5, 5]}
            cols={[
              "No Alignment",
              <Row style={{ marginTop: "15px" }}></Row>,
              "Moderate",
              <Row style={{ marginTop: "15px" }}></Row>,
              "Excellent",
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default RecommendPage;
