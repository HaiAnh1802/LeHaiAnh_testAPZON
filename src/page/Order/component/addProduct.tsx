import { Form, Input, InputNumber, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { IProductOrder } from "../../../models/product.model";
import { filter } from "lodash";

interface IModalCreateMaterialGroup {
  listProduct: IProductOrder[];
  handleListProduct: (list: IProductOrder[]) => void;
  cancelChange?: () => void;
  doneChange?: () => void;
}

const AddProduct: React.FC<IModalCreateMaterialGroup> = ({
  listProduct,
  handleListProduct,
  cancelChange,
  doneChange,
  ...props
}) => {
  const [formAdd] = Form.useForm();

  const onCreate = () => {
    formAdd.validateFields().then((values) => {
      const _listProduct: IProductOrder[] = listProduct;
      const check_product = filter(
        _listProduct,
        (e: IProductOrder) => e.code === values.code
      );
      if (check_product.length > 0) {
        notification.error({ message: `Mã mặt hàng đã tồn tại` });
      } else {
        const item: IProductOrder = {
          code: values.code,
          name: values.name,
          quantity: values.quantity,
          price: values.price,
          total_price: values.price * values.quantity,
        };
        _listProduct.push(item);

        handleListProduct(_listProduct);
        onHideModal();
      }
    });
  };

  const onHideModal = () => {
    formAdd.resetFields();
    cancelChange && cancelChange();
  };

  return (
    <>
      <Modal
        title={`Thêm mặt hàng`}
        open={true}
        onOk={onCreate}
        onCancel={onHideModal}
        bodyStyle={{
          paddingTop: 16,
        }}
      >
        <Form form={formAdd}>
          <Form.Item
            name="code"
            label={`Mã mặt hàng`}
            rules={[{ required: true, message: `Vui lòng nhập mã mặt hàng` }]}
          >
            <Input placeholder="Nhập mã mặt hàng" />
          </Form.Item>
          <Form.Item
            name="name"
            label={`Tên mặt hàng`}
            rules={[{ required: true, message: `Vui lòng nhập tên mặt hàng` }]}
          >
            <Input placeholder="Nhập tên mặt hàng" />
          </Form.Item>
          <Form.Item
            name="quantity"
            label={`Số lượng`}
            rules={[{ required: true, message: `Vui lòng nhập số lượng` }]}
          >
            <InputNumber className="w-full" placeholder="Nhập số lượng" />
          </Form.Item>
          <Form.Item
            name="price"
            label={"Đơn giá"}
            rules={[{ required: true, message: `Vui lòng nhập đơn giá` }]}
          >
            <InputNumber
              className="w-full"
              addonAfter="VNĐ"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              placeholder="Nhập số lượng"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddProduct;
