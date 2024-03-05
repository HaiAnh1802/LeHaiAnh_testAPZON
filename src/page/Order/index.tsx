import { Button, Form, Input, Tabs } from "antd";
import { useState } from "react";
import OrderInfo from "./component/InfoOrder";
import LayoutCreate from "./component/LayoutCreate";
import { SkusTable } from "./component/SkusTable";

import { IProductOrder } from "../../models/product.model";
import { cloneDeep, sumBy } from "lodash";
import { TabsProps } from "antd/lib";
import AddProduct from "./component/addProduct";
import ImportProductFileExcel from "./component/ImportProductFileExcel";

const OrderCreate = () => {
  const [form] = Form.useForm();
  const [typeCreate, setTypeCreate] = useState<string>("saleOrder");
  const [listProduct, setListProduct] = useState<IProductOrder[]>([]);
  const [isShowAddProduct, setIsShowAddProduct] = useState<boolean>(false);
  const handleChangeListProduct = (listProduct: IProductOrder[]) => {
    const _listProduct = cloneDeep(listProduct);
    const sum_total_price = sumBy(_listProduct, (e) => e.total_price);
    form.setFieldValue(
      typeCreate === "saleOrder" ? "total_money_sale" : "total_money_purchase",
      sum_total_price
    );
    setListProduct(_listProduct);
  };

  const items: TabsProps["items"] = [
    {
      key: "saleOrder",
      label: "Tạo đơn bán hàng",
    },
    {
      key: "orderPurchase",
      label: "Tạo đơn mua hàng",
    },
  ];
  const onChangeTypeCreate = (key: string) => {
    setTypeCreate(key);
    setListProduct([]);
    form.resetFields();
  };
  return (
    <LayoutCreate>
      <div>
        <div>
          <Tabs
            defaultActiveKey="saleOrder"
            items={items}
            onChange={onChangeTypeCreate}
          />
        </div>
        <div>
          <Form
            form={form}
            scrollToFirstError={{
              behavior: "smooth",
              scrollMode: "always",
            }}
            labelAlign="left"
            labelCol={{ span: 16 }}
            layout="vertical"
          >
            <div>
              <OrderInfo form={form} tpyeCreate={typeCreate} />
            </div>
          </Form>
          <div>
            <div className="flex items-center justify-between">
              <div className="font-medium text-lg">Chi tiết mặt hàng</div>
              <div className="flex">
                <Button
                  type="primary"
                  onClick={() => setIsShowAddProduct(true)}
                >
                  Thêm mặt hàng
                </Button>
                <div className="ml-2">
                  <ImportProductFileExcel
                    setListProductImport={(list) => setListProduct(list)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <SkusTable
              dataSource={listProduct}
              setDataSource={(item) => handleChangeListProduct(item)}
            />
          </div>
        </div>
        {isShowAddProduct && (
          <AddProduct
            cancelChange={() => setIsShowAddProduct(false)}
            listProduct={listProduct}
            handleListProduct={(item) => handleChangeListProduct(item)}
          />
        )}
      </div>
    </LayoutCreate>
  );
};
export default OrderCreate;
