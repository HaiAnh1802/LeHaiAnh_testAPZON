import { Button, Col, Layout, Row } from "antd";
import React from "react";

interface ILayoutCreateProps {
  children: React.ReactNode;
  loading?: boolean;
  handleSubmit?: () => void;
}
const { Content } = Layout;
const LayoutCreate: React.FC<ILayoutCreateProps> = ({
  children,
  handleSubmit,

  loading,
}) => {
  return (
    <Layout className="pb-8">
      <Content className="site-layout mt-16 h-full min-h-screen !bg-white">
        <Row className="mx-auto mt-6 flex w-full justify-center">
          <Col className="mx-3 w-4/5 min-w-[800px]">{children}</Col>
          {/* {children} */}
        </Row>
        <Row className="mx-auto mt-6 flex w-full justify-center pb-2">
          <Col className="mx-3 w-4/5 min-w-[800px]">
            <div className="flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleSubmit}
                loading={loading}
              >
                Lưu lại
              </Button>

              <Button
                danger={true}
                htmlType="submit"
                onClick={handleSubmit}
                loading={loading}
                className="ml-2"
              >
                Hủy
              </Button>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LayoutCreate;
