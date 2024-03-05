import { Button } from "antd";
import {
  chain,
  filter,
  find,
  findIndex,
  findKey,
  groupBy,
  sumBy,
} from "lodash";
import { useState } from "react";
import { AddFile } from "../../../components/importFileCommon";
import { IProductOrder } from "../../../models/product.model";

interface IItemInput {
  name: string;
  key: string;
  require?: boolean;
  className?: string;
}

interface IImportProductFileExcel {
  setListProductImport: (listProduct: IProductOrder[]) => void;
  creator_id?: number;
}
const ImportProductFileExcel: React.FC<IImportProductFileExcel> = ({
  setListProductImport,
  creator_id,
}) => {
  const [isShowModalImport, setIsShowModalImport] = useState<boolean>(false);

  const addFileSuccess = async (dataMap: IProductOrder[]) => {
    console.log("dataMap", dataMap);
    const _dataMap = dataMap.map((item: IProductOrder) => ({
      ...item,
      total_price: item.price * item.quantity,
    }));
    console.log("_dataMap", _dataMap);

    setListProductImport(_dataMap);
    setIsShowModalImport(false);
  };

  const inputData: IItemInput[] = [
    {
      key: "code",
      name: "Mã mặt hàng",
      require: true,
      className: "col-span-2 ",
    },
    {
      key: "name",
      name: "Tên mặt hàng",
      require: true,
      className: "col-span-2 ",
    },
    {
      key: "quantity",
      name: "Số lượng",
      className: "col-span-2 ",
    },
    {
      key: "price",
      name: "Đơn giá",
      className: "col-span-2 ",
    },
  ];
  return (
    <>
      <Button
        className="mb-4"
        type="primary"
        onClick={() => setIsShowModalImport(true)}
      >
        Nhập excel
      </Button>

      <AddFile
        open={isShowModalImport}
        onSuccess={(inputValueName) => addFileSuccess(inputValueName)}
        onCancel={() => setIsShowModalImport(false)}
        inputData={inputData}
      />
    </>
  );
};
export default ImportProductFileExcel;
