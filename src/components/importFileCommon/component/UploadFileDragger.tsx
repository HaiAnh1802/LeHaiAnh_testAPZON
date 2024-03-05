import { FC, useEffect, useState } from "react";

import { Popover, Upload, notification } from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { InboxOutlined } from "@ant-design/icons";
import { read, utils } from "xlsx";

interface IProps {
  onReadData: (file: any) => void;
  listError?: {
    isError: boolean;
    message: string;
  };
}
const { Dragger } = Upload;
export const UploadFileDragger: FC<IProps> = ({ onReadData, listError }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const checkFileFormat = (fileName: string) => {
    let exten = fileName.substring(fileName.length - 3, fileName.length);
    if (exten === "xls" || exten === "lsx" || exten === "xlsx") {
      return true;
    } else {
      return false;
    }
  };
  const handleFile = async (file: any) => {
    if (!file || !file.length) {
      return;
    }
    let fileData: any = {};
    file.forEach((detail: { (key: string): string }) => {
      fileData = detail;
    });
    if (!fileData) return;
    if (!checkFileFormat(fileData?.name as string)) {
      notification.error({
        message: `${fileData.name} không phải file excel`,
      });
      return;
    }
    /* f is a File */
    const data = await fileData.arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = read(data);
    const sheets = workbook.SheetNames;
    // console.log("sheets", workbook.Sheets)

    if (sheets.length) {
      const cols = utils.sheet_to_json(workbook.Sheets[sheets[0]], {
        header: 1,
        defval: "",
        blankrows: true,
      });

      const rows = utils.sheet_to_json(workbook.Sheets[sheets[0]]);
      onReadData(file);
      setFileList([]);
    }
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  useEffect(() => {
    handleFile(fileList);
  }, [fileList]);

  return (
    <div>
      <div className="mb-4">
        <Dragger {...props} maxCount={1}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Nhấn hoặc kéo file để tải lên!</p>
        </Dragger>
      </div>
      <div>
        {listError?.isError && (
          <div className="relative rounded border  border-red-400 font-bold text-red-600">
            {listError.message}
          </div>
        )}
        <div className="flex">
          <a
            href={"/template/import_sản phẩm.xlsx"}
            download={true}
            className="mr-2 flex items-center text-base font-medium "
          >
            Tải file mẫu
          </a>
          <h1 className="text-base font-medium">Xem định dạng tập tin</h1>
        </div>
      </div>
    </div>
  );
};
