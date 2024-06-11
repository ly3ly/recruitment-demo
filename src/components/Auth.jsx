import { Row, Col, Card, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Login as LoginApi, UpdateOptTime as UpdateTimeApi } from "../services/user";
import { message } from 'antd';
import { setToken } from "../services/tools";
import { VISIT_TYPE } from "../services/user";

const AuthPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const validateInput = (_, value) => {
    if (!value) {
      return Promise.reject('invalid input');
    }

    const regex = /^[A-Za-z0-9]{24}$/;
    if (!regex.test(value)) {
      return Promise.reject('invalid input');
    }

    return Promise.resolve();
  };


  return (
    <Row>
      <Col md={{ span: 8, push: 8 }} xs={{ span: 24, push: 1 }}>
        <Card title="Login">
          <Form
            form={form}
            labelCol={{ md: { span: 8 } }}
            onFinish={async (values) => {

              

              try {

                let res2 = await LoginApi({
                  user_name: values.Username,
                })
                if (res2.code != 0) {
                  message.error(res2.msg);
                  return;
                }
                setToken(res2.data.token);

                //
                let time_res = await UpdateTimeApi({
                  // user_id: res2.data.id,
                  user_id: 1,
                  user_name: res2.data.user_name,
                  serial_uuid: res2.data.token,// 用token作为serial  
                  visit_type: VISIT_TYPE,
                  time_type: 1
                })
                if (time_res.code != 0) {
                  // message.error(time_res.msg + " operate time won't be recorded...");
                  console.log("operate time won't be recorded...", time_res.msg)
                }

                localStorage.setItem('userInfo', JSON.stringify({
                  // subject_id: res2.data.id,
                  subject_id:1,
                  subject_name: res2.data.user_name,
                  // serial_uuid: time_res?.data?.SerialUUID || "none"
                  serial_uuid: res2.data.token || "none" // 用token作为serial  
                }));

                navigate('/home');
              } catch (error) {
                console.log(error);
                message.error(error);
              }
            }}
          >
            <Form.Item
              label="Prolific ID"
              name="Username"
              rules={[
                {
                    validator: validateInput,
                }
              ]}
            >
              <Input placeholder="Please input prolific ID" />
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
 
        </Card>
      </Col>
    </Row>
  );
};
export default AuthPage;
