import { Button, Form, FormInstance, Modal, ModalProps, Spin } from "antd";

import { FC, ReactNode, useEffect } from "react";

interface IProps extends ModalProps {
  open?: boolean;
  isLoading: boolean;
  form: FormInstance;
  children: ReactNode;
  firstFocusFieldName?: string;
  labelCol?: number;
  wrapperCol?: number;
  onFinish: (values: any) => void;
  onCancel?: () => void;
  create?: boolean;
  initialValue?: any;
}

export const FormModalAddFile: FC<IProps> = ({
  children,
  isLoading,
  form,
  labelCol,
  wrapperCol,
  onFinish,
  onCancel,
  create = false,
  initialValue,
  ...props
}) => {
  useEffect(() => {
    if (!props.open) {
      form.resetFields();
      return;
    }
  }, [form, props.open]);

  return (
    <Modal onCancel={onCancel} {...props} maskClosable={false} footer={null}>
      <Spin spinning={isLoading}>
        <Form
          form={form}
          labelAlign="left"
          //layout="vertical"
          //labelCol={{ span: labelCol ? labelCol : 8 }}
          //wrapperCol={{ span: wrapperCol ? wrapperCol : 16 }}
          onFinish={onFinish}
          initialValues={initialValue}
          autoComplete="off"
        >
          {children}
          <div className="flex justify-end gap-3">
            <Form.Item shouldUpdate className="submit">
              {() => <Button htmlType="submit">Xác nhận</Button>}
            </Form.Item>

            <Button onClick={onCancel}>Hủy</Button>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};
