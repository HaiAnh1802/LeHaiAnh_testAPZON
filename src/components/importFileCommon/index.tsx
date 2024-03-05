import { Form, ModalProps, Col, Row, Select, Space, Radio } from "antd";
import { FC, useState, useRef, useMemo } from "react";

import { SelectColumn } from "./component/SelectColumn";
import { UploadFileDragger } from "./component/UploadFileDragger";

import { cloneDeep, compact, filter, isEmpty } from "lodash";
import { read, utils } from "xlsx";
import { FormModalAddFile } from "./component/FormModalAddFile";
import { dataExcel } from "../DataExcel/DataExcel";

interface IItemInput {
  name: string;
  key: string;
  require?: boolean;
  className?: string;
}
interface IProps extends ModalProps {
  open: boolean;
  onSuccess: (dataMap: any) => void;
  inputData: IItemInput[];
  multiple?: boolean;
}

export const AddFile: FC<IProps> = ({
  onSuccess,
  onCancel = () => {},
  inputData,
  multiple,
  ...props
}: IProps) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [colName, setColName] = useState<string[]>([]);
  const [rowValue, setRowValue] = useState<any>();
  const [inputArrangeName, setInputArrangeName] = useState<{
    [key in string]: string;
  }>({});
  const [fileList, setFileList] = useState<any>();
  // const [shopId, setShopId] = useState<string[]>([])
  const [listError, setListError] = useState<{
    isError: boolean;
    message: string;
  }>();
  const [isLoadExcel, setLoadExcel] = useState<boolean>(true);

  const onSubmit = () => {
    setLoading(true);
    let data = rowValue;
    !data
      ? setListError({
          isError: true,
          message: `Vui lòng tải file lên`,
        })
      : setListError(undefined);

    data = data.map((item: any) => {
      let _item: { [key in string]: string } = {};
      inputData.forEach((key) => {
        _item[key.key] = item[inputArrangeName[key.name]]
          ? item[inputArrangeName[key.name]]
          : "";
      });
      return _item;
    });
    setLoading(false);
    onSuccess(data);
    form.resetFields();
    setFileList(undefined);
    setRowValue(undefined);
    setInputArrangeName({});
  };
  const onReadData = async (file: any) => {
    form.resetFields();
    setListError(undefined);
    setLoadExcel(false);
    let fileData: any = {};
    file.forEach((detail: { (key: string): string }) => {
      fileData = detail;
    });
    /* f is a File */
    const data = await fileData.arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = read(data);
    const sheets = workbook.SheetNames;

    if (sheets.length) {
      const cols = utils.sheet_to_json(workbook.Sheets[sheets[0]], {
        header: 1,
        defval: "",
        blankrows: true,
      });
      const title: any = cols[0];
      const rows: any = utils.sheet_to_json(workbook.Sheets[sheets[0]]);

      const first_sheet_name = rows[0];
      let _title: any = {};
      title.forEach((element: any, index: number) => {
        _title[element] = element;
      });
      let name: any[] = [];
      if (rows.length) {
        Object.keys(first_sheet_name).map((item: any) => {
          name.push(item);
        });
      }

      const mapName: any = {};
      inputData.map((item: any, index) => {
        // mapName[item.name] = _title[item.name]
        dataExcel[item.key] &&
          dataExcel[item.key].map((_item: string) => {
            const __title = filter(title, (e) => e === _item);
            if (__title && __title.length > 0) {
              mapName[item.name] = __title[0];
            }
          });
      });

      setTimeout(() => {
        setLoadExcel(true);
      }, 10);

      setColName(cloneDeep(title));
      setInputArrangeName(cloneDeep(mapName));
      setRowValue(cloneDeep(rows));
      setFileList(cloneDeep(file));
    }
  };

  //get value in excel map with input name
  const handleSKu = (idColName: any, inputDataName: string) => {
    inputArrangeName[inputDataName] = idColName;

    setInputArrangeName(inputArrangeName);
  };

  const handleCancel = () => {
    setColName([]);
    setInputArrangeName({});
    setRowValue(undefined);
    setFileList(undefined);
    onCancel({} as any);
    setListError(undefined);
  };

  return (
    <FormModalAddFile
      open={props.open}
      title={`Tải lên file excel`}
      onFinish={onSubmit}
      onCancel={() => handleCancel()}
      form={form}
      isLoading={false}
      width={1000}
    >
      {fileList && <div>{fileList[0].name}</div>}
      <div>
        <UploadFileDragger
          onReadData={(file) => onReadData(file)}
          listError={listError}
        />
      </div>
      {/* <div>
        <UploadFile onReadData={(rowValue) => onReadData(rowValue)} />
      </div> */}
      {rowValue && (
        <>
          <div>
            <h1 className="text-danger text-base font-medium">
              Chọn dữ liệu tương ứng để tải lên
            </h1>
          </div>
          <div>
            {/* <Row>
              <Col flex={2}>
                <Row className="text-base font-medium">Dữ liệu đầu vào</Row>
                {inputData?.map((item, index) => {
                  return (
                    <Row
                      className="mb-10 mt-4 text-base font-normal"
                      key={index}>
                      {item.name}
                    </Row>
                  )
                })}
              </Col> */}

            {/* <Col flex={3}> */}
            <Row className="mt-4 text-base font-medium">
              Chọn giá trị cho các trường
            </Row>
            <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-4">
              {isLoadExcel &&
                inputData?.map((item, index) => {
                  let title: any[] = [];
                  dataExcel[item.key] &&
                    dataExcel[item.key].map((item: string) => {
                      const _title = filter(colName, (e) => e === item);
                      if (_title && _title.length > 0) {
                        title = [..._title];
                      }
                    });
                  if (item.key !== "variants_name") {
                    form.setFieldValue(
                      `${item.key}`,
                      `${title?.length > 0 ? title[0] : ""}`
                    );
                  }
                  if (item.key == "variants_name") {
                    return (
                      <Space className="mt-2 text-base font-normal" key={index}>
                        <Form.Item
                          name={item.key}
                          initialValue={item.name}
                          label={item.name}
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: item.require,
                              message: `Chọn giá trị cho trường dữ liệu`,
                            },
                          ]}
                          key={index}
                        >
                          <SelectColumn
                            columnModeOption={colName}
                            onChange={(e) => handleSKu(e, item.name)}
                          />
                        </Form.Item>
                      </Space>
                    );
                  } else {
                    return (
                      <div
                        className={`${item.className} mr-2 text-base font-normal`}
                        key={item.name}
                      >
                        <Form.Item
                          name={item.key}
                          // initialValue={title.length > 0 ? title[0] : null}
                          label={item.name}
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: item.require,
                              message: `Chọn giá trị cho trường dữ liệu`,
                            },
                          ]}
                          key={index}
                        >
                          <SelectColumn
                            columnModeOption={compact(colName)}
                            onChange={(e) => handleSKu(e, item.name)}
                          />
                        </Form.Item>
                      </div>
                    );
                  }
                  // return (
                  //   <Row
                  //     className="mt-2 text-base font-normal"
                  //     key={index}>
                  //     <Form.Item
                  //       name={item.key}
                  //       initialValue={item.require && title.length > 0 ? title[0] : null}
                  //       label={item.name}
                  //       rules={[{ required: item.require, message: `${t("common.select_value_to_data_storage_field")}` }]}
                  //       key={index}>
                  //       <SelectColumn
                  //         columnModeOption={colName}
                  //         onChange={(e) => handleSKu(e, item.name)}
                  //       />
                  //     </Form.Item>
                  //   </Row>
                  // )
                })}
            </div>

            {/* </Col> */}
            {/* </Row> */}
          </div>
        </>
      )}
    </FormModalAddFile>
  );
};
