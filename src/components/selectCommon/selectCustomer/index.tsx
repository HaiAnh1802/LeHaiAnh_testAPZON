import { Select, Tag } from "antd";

import React, { useEffect, useState } from "react";

interface ISelectCustomerProps {
  value?: string;
  onChange?: (value: any) => void;
  modeSelect?: boolean;
}
const { Option } = Select;

function SelectCustomerOrder({
  onChange,
  value,
  modeSelect = true,
}: ISelectCustomerProps) {
  const listCustomer: any = {
    1: "Công ty cổ phần HA",
    5: "Công ty cổ phần HB",
    10: "Công ty cổ phần HC",
  };
  const customerOption = Object.keys(listCustomer).map((item: any, key) => ({
    value: item,
    label: listCustomer[item],
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
        placeholder={`Chọn khách hàng`}
        options={customerOption}
      ></Select>
    </>
  );
}

export default SelectCustomerOrder;
