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
import { UpdateOptTime as UpdateTimeApi, UpdateUserInActive as UpdateUserInActiveApi, ReportUserActivity, ReportPage } from "../services/user";
import { VISIT_TYPE } from "../services/user";
import { getToken } from "../services/tools";
import PromoteCard from './PromoteCard'
import throttle from 'lodash.throttle';


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

  const THROTTLE_TIME = 1000;
  const REPORT_INTERVAL = 1000 * 5; // 5 seconds


  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    setUserInfo(JSON.parse(storedUser))
    // var msg = getToken();
    const handleUserActivity = throttle(async (event) => {
      
      let reportInfo = {
        user_name: userInfo.subject_name,
        visit_type: VISIT_TYPE,
        serial_uuid: userInfo.serial_uuid,
        time: Math.floor(new Date().getTime() / 1000),
        active_type: event.type,
        page_type: showExplain == true ? 2 : 1,
        explain_open:showExplain,
      }

      console.log("event", event.type,reportInfo.time);
      let res = await ReportUserActivity(reportInfo);
      if (res.code != 0) {
        console.log('report error...', reportInfo.time, res.msg)
      }
      // else{
      //   console.log('report success...', reportInfo.time)
      // }
    }, THROTTLE_TIME)

    const reportData = async () => {
      // 在此处添加向后端上报数据的逻辑
      
      let reportInfo = {
        user_name: userInfo.subject_name,
        visit_type: VISIT_TYPE,
        serial_uuid: userInfo.serial_uuid,
        time: Math.floor(new Date().getTime() / 1000),
        interval: REPORT_INTERVAL/1000,
        page_type: showExplain == true ? 2 : 1,
        explain_open:showExplain,
      }
      console.log('reporting...', reportInfo.time)
      let res = await ReportPage(reportInfo);
      if (res.code != 0) {
        console.log('report error...', reportInfo.time, res.msg)
      } 
      // else {
      //   console.log('report success...', reportInfo.time)
      // }

    };

    let reportInterval;

    const startReporting = () => {
      if (reportInterval) {
        return;
      }
      reportInterval = setInterval(reportData, REPORT_INTERVAL); // 每 5 秒上报一次
    };

    const stopReporting = () => {
      if (!reportInterval) {
        return;
      }
      clearInterval(reportInterval);
      reportInterval = undefined;
    };

    let isPageVisible = true;

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        startReporting();
      } else {
        stopReporting();
      }
    };

    const handlePageBlur = () => {
      console.log('blur')
      isPageVisible = false;
      stopReporting();
    };

    const handlePageFocus = () => {
      console.log('focus')
      isPageVisible = true;
      startReporting();
    };



    // document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handlePageBlur);
    window.addEventListener('focus', handlePageFocus);
    // window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('wheel', handleUserActivity);
    window.addEventListener('mousedown', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    startReporting();

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('wheel', handleUserActivity);
      window.removeEventListener('mousedown', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('blur', handlePageBlur);
      window.removeEventListener('focus', handlePageFocus);
      // window.removeEventListener('visibilitychange', handleVisibilityChange);
      // document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopReporting();
    };
  }, [REPORT_INTERVAL, userInfo.serial_uuid,showExplain]);




  // const reportInactivity = async () => {
  //   const inactive = 60
  //   // console.log('showExplain', showExplain)
  //   console.log(userInfo.serial_uuid)
  //   let res = await UpdateUserInActiveApi({
  //     time: inactive,
  //     serial_uuid: userInfo.serial_uuid,
  //     type: showExplain == true ? 2 : 1,
  //   })
  //   if (res.code != 0) {
  //     console.log(res.msg)
  //   }
  // };

  return (
    <>
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
        {VISIT_TYPE == 1 || VISIT_TYPE == 2 || VISIT_TYPE == 6 || VISIT_TYPE == 7 ? <div> {VISIT_TYPE == 1 || VISIT_TYPE == 6 || VISIT_TYPE == 7 ? <Title level={3}>Input Explanation:</Title> : null}
          <p style={{ textAlign: "justify" }}>
            This AI hiring system employs a range of input data from CV screening to interactive evaluations including game-based assessment and video interview assessment. In CV screening, AI will utilize the working experience, skills and qualifications from both candidates and successful employees. In game-based assessment, the candidates' reactions in game such as time taken and decision made will be recorded. In video interview assessment, candidates’ verbal, paraverbal, and nonverbal behaviors will be extracted.
          </p>
          <p style={{ textAlign: "justify" }}>
            Overall, the AI hiring system forms a comprehensive dataset from diverse sources, including candidates’ CVs and profiles of successful employees, as well as game-based assessments and video interview evaluations, to identify candidates who meet organizational requirements and exhibit desired traits.
          </p></div> : null}

        {VISIT_TYPE == 1 || VISIT_TYPE == 3 || VISIT_TYPE == 6 || VISIT_TYPE == 8 ? <div>

          {VISIT_TYPE == 1 || VISIT_TYPE == 6 || VISIT_TYPE == 8 ? <Title level={3}>Process Explanation:</Title> : null}

          <p style={{ textAlign: "justify" }}>
            The AI hiring system employs machine learning (ML) algorithms and natural language processing (NLP) to analyze input data from CVs, game-based assessments, and video interviews. During CV screening, ML and NLP are used to extract relevant information by deconstructing words and phrases according to predefined grammatical rules. The AI then compares this information against profiles of successful employees to assign scores. In game-based assessments, it identifies behavioral patterns to evaluate cognitive abilities.  Finally, in video interviews, the system assesses candidates' responses, measuring their alignment with the company's target profile to determine their suitability for the job and the organization.
          </p>
          <p style={{ textAlign: "justify" }}>
            Overall, the AI hiring system uses ML and NLP to automate the hiring process. It parses and analyzes vast amounts of input data from CV, game-based assessment and video interview. Such algorithms enable a nuanced analysis of a candidate's potential based on a variety of complex datasets.
          </p></div> : null}


        {VISIT_TYPE == 1 || VISIT_TYPE == 4 || VISIT_TYPE == 7 || VISIT_TYPE == 8 ? <div>
          {VISIT_TYPE == 1 || VISIT_TYPE == 7 || VISIT_TYPE == 8 ? <Title level={3}>Output Explanation:</Title> : null}
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
            <Card hoverable style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)', borderRadius: '15px' }}>
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

                  <img src={explainIMG} style={{ width: "100px" }}></img>

                  <Button
                    type="primary"
                    size="large"
                    style={{
                      fontSize: '28px', padding: '30px 24px', display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: '10px',
                      width: '300px',
                      height: '80px',
                    }}
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
                <Text strong style={{ fontSize: "24px" }}>
                  {" "}
                  To give you a better understanding of AI's recommendation, please click the {" "}“
                  <Text style={{ color: "red", fontSize: "24px" }}>
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
            marginBottom: "30px"
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
            <Text strong style={{ fontSize: '20px' }}>
              {" "}
              The following is the{" "}
              <Text style={{ color: "red", fontSize: '20px' }}>individual detailed score</Text> for
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
