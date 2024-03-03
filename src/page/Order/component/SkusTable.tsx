import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, Table } from "antd";
import { IProductOrder } from "../../../models/product.model";
import formatMonney from "../../../components/formatCommon/formatMonney";
import { cloneDeep, filter } from "lodash";

interface IProps {
  dataSource: IProductOrder[];
  setDataSource: (list: IProductOrder[]) => void;
}

export const SkusTable: React.FC<IProps> = ({ dataSource, setDataSource }) => {
  // const [form] = Form.useForm()
  const [listProduct, setListproduct] = useState<IProductOrder[]>([]);
  useEffect(() => {
    setListproduct(dataSource);
  }, [dataSource]);

  const handleDeleteItem = (code: string) => {
    const _listProduct: IProductOrder[] = cloneDeep(listProduct);
    const filter_list = filter(_listProduct, (e) => e.code !== code);
    setDataSource(filter_list);
  };
  let columns: any[] = [
    {
      title: <span className=" font-bold">Mã mặt hàng</span>,
      dataIndex: "code",
      key: "code",
      render: (code: any) => {
        return (
          <>
            <div>{code}</div>
          </>
        );
      },
    },
    {
      title: <span className=" font-bold">Tên mặt hàng</span>,
      key: "name",
      dataIndex: "name",
    },
    {
      title: <span className=" font-bold">Số lượng</span>,
      key: "quantity",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: <span className=" font-bold">Đơn giá</span>,
      key: "price",
      dataIndex: "price",
      align: "center",
      render: (price: number) => {
        const _price = formatMonney(price, "VND");
        return <div className="text-red-500">{_price}</div>;
      },
    },

    {
      title: <span className=" font-bold">Thành tiền</span>,
      key: "total_price",
      align: "center",
      dataIndex: "total_price",
      render: (total_price: number) => {
        const _total_price = formatMonney(total_price, "VND");
        return <div className="text-red-500">{_total_price}</div>;
      },
    },
    {
      title: <span className=" font-bold">Hàng động</span>,
      key: "action",
      dataIndex: "code",
      align: "center",
      render: (code: string) => {
        return (
          <div className="text-red-500">
            <Button
              danger={true}
              htmlType="submit"
              onClick={() => handleDeleteItem(code)}
            >
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        bordered
        dataSource={listProduct}
        columns={columns}
        size="small"
        // pagination={false}
        pagination={{
          pageSize: 25,
          showSizeChanger: false,
        }}
      />
    </div>
  );
};
