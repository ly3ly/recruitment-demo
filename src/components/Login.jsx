import { Row, Col, Card, Form, Input, Button, Typography } from "antd";
const { Text } = Typography;
import { useNavigate } from "react-router-dom";
import { Login as LoginApi, UpdateOptTime as UpdateTimeApi } from "../services/user";
import { message } from 'antd';

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  return (
    <Row>
      <Col md={{ span: 8, push: 8 }} xs={{ span: 24, push: 1 }}>
        {/* <img
          src={logo}
          alt="ninja"
          style={{
            display: "block",
            margin: "20px auto",
            borderRadius: "50%",
            width: "200px",
          }}
        ></img> */}
        <Card title="Login">
          <Form
            form={form}
            labelCol={{ md: { span: 8 } }}
            onFinish={async (values) => {
              try {

                let res2 = await LoginApi({
                  user_name: values.Username,
                  password: values.Password
                })
                if (res2.code != 0) {
                  message.error(res2.msg);
                  return;
                }

                //
                let time_res = await UpdateTimeApi({
                  user_id: res2.data.id,
                  user_name: res2.data.user_name,
                  serial_uuid: "none",
                  time_type: 1
                })
                if (time_res.code != 0){
                  // message.error(time_res.msg + " operate time won't be recorded...");
                  console.log("operate time won't be recorded...",time_res.msg)
                }

                localStorage.setItem('userInfo', JSON.stringify({
                  subject_id: res2.data.id,
                  subject_name: res2.data.user_name,
                  serial_uuid: time_res?.data?.serial_uuid || "none"
                }));

                navigate('/home');
              } catch (error) {
                console.log(error);
                message.error(error);
              }
            }}
          >
            <Form.Item
              label="Username"
              name="Username"
              rules={[
                {
                  required: true, message: "Please input your username!",
                  min: 5, max: 30
                },
              ]}
            >
              <Input placeholder="Please input username" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="Password"
              rules={[
                {
                  required: true, message: "Please input your password!",
                  min: 8,
                  max: 40
                },
              ]}
            >
              <Input.Password placeholder="Please input password" />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                style={{
                  display: "block",
                  margin: "8px auto",
                  width: "20vw",
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <Col style={{ width: '100%', textAlign: 'center' }}>
            <Text type="secondary" underline style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Don&apos;t have an account? Click here to register.</Text>
          </Col>
        </Card>
      </Col>
    </Row>
  );
};
export default Login;
