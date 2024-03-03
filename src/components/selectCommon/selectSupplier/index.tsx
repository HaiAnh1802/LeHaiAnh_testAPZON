import { Select, Tag } from "antd";

import React, { useEffect, useState } from "react";

interface ISelectSupplierProps {
  value?: string;
  onChange?: (value: any) => void;
  modeSelect?: boolean;
}
const { Option } = Select;

function SelectSupplierOrder({
  onChange,
  value,
  modeSelect = true,
}: ISelectSupplierProps) {
  const listSupplier: any = {
    1: "Nhà cung cấp Ca",
    5: "Nhà cung cấp Cb",
    10: "Công cung cấp Cd",
  };
  const SupplierOption = Object.keys(listSupplier).map((item: any, key) => ({
    value: item,
    label: listSupplier[item],
  }));

  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <>
      <Select
        value={value ?? undefined}
        onChange={handleChange}
        mode={modeSelect ? "multiple" : undefined}
        allowClear={true}
        placeholder={`Chọn nhà cung cấp`}
        options={SupplierOption}
      ></Select>
    </>
  );
}

export default SelectSupplierOrder;
