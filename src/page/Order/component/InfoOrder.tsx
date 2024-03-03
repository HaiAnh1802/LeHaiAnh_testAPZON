import { Button, Checkbox, DatePicker, Form, Input, InputNumber } from "antd";
import { FormInstance } from "antd/lib/form/Form";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SelectCustomerOrder from "../../../components/selectCommon/selectCustomer";
import SelectSupplierOrder from "../../../components/selectCommon/selectSupplier";

const { TextArea } = Input;
interface IProductStandardInfoProps {
  form: FormInstance;
  tpyeCreate: string;
}

const OrderInfo: React.FC<IProductStandardInfoProps> = ({
  form,
  tpyeCreate,
}) => {
  return (
    <>
      {tpyeCreate === "saleOrder" ? (
        <div>
          <div className="grid grid-cols-2 gap-2">
            <Form.Item label={`Mã khách hàng`} name={"buyer_code"}>
              <Input placeholder={`Nhập mã khách hàng`} />
            </Form.Item>
            {/*  */}

            <Form.Item label={`Ngày chứng từ`} name={"date_sale"}>
              <DatePicker
                className="w-full"
                placeholder="Chọn ngày chứng từ"
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Form.Item label={`Tên khách hàng`} name={"customer_id"}>
              <SelectCustomerOrder modeSelect={false}></SelectCustomerOrder>
            </Form.Item>
            <Form.Item label={`Tổng tiền`} name={"total_money_sale"}>
              <InputNumber
                className="w-full "
                addonAfter="VNĐ"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                placeholder={`Nhập tổng tiền`}
              />
            </Form.Item>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-2">
            <Form.Item label={`Mã nhà cung cấp`} name={"supplier_code"}>
              <Input placeholder={`Nnhập mã khách hàng`} />
            </Form.Item>
            {/*  */}

            <Form.Item label={`Ngày chứng từ`} name={"date_purchase"}>
              <DatePicker className="w-full" placeholder="Chọn ngày chứng từ" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Form.Item label={`Tên nhà cung cấp`} name={"supplier_id"}>
              <SelectSupplierOrder modeSelect={false}></SelectSupplierOrder>
            </Form.Item>
            <Form.Item label={`Tổng tiền`} name={"total_money_purchase"}>
              <InputNumber
                className="w-full "
                addonAfter="VNĐ"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                placeholder={`Nhập tổng tiền`}
              />
            </Form.Item>
          </div>
        </div>
      )}

      {/* </div> */}
    </>
  );
};

export default OrderInfo;
