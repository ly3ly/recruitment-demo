import { Row, Col, Card, Form, Input, Button } from "antd";
import { message } from 'antd';
import { useNavigate } from "react-router-dom";
import { Register as RegisterApi } from "../services/user";
import { Login as LoginApi } from "../services/user";

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  return (
    <Row>
      <Col md={{ span: 8, push: 8 }} xs={{ span: 24, push: 1 }}>
        <Card title="Register">
          <Form
            form={form}
            labelCol={{ md: { span: 8 } }}
            onFinish={async (values) => {
              try {
                let res = await RegisterApi({
                  nickname: values.Username,
                  user_name: values.Username,
                  password: values.Password,
                  password_confirm: values.Password
                });
                if (res.code != 0) {
                  message.error(res.msg);
                  return;
                }

                let res2 = await LoginApi({
                  user_name: values.Username,
                  password: values.Password
                })
                if (res2.code != 0) {
                  message.error(res2.msg);
                  return;
                }
                localStorage.setItem('userInfo', JSON.stringify({
                  subject_id: res2.data.id,
                  subject_name: res2.data.user_name
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
                  required: true, message: "Please input your username! 5~30 chars",
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
                  required: true, message: "Please input your password! 8~40 chars",
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
                Register & Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row >
  );
};
export default Register;
