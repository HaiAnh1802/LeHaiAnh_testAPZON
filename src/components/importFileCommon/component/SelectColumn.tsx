import { Cascader, CascaderProps, Select } from "antd";
import { ValueType } from "rc-cascader/lib/Cascader";
import { FC, useEffect, useState } from "react";

type IProps = CascaderProps & {
  allowSelectParent?: boolean;
  excludeIds?: number[];
  value?: string | undefined;
  showAllPath?: boolean;
  columnModeOption?: string[];
};

export const SelectColumn: FC<IProps> = ({
  allowSelectParent = false,
  value = undefined,
  excludeIds,
  columnModeOption,
  onChange = () => null,
  showAllPath = false,
  ...props
}) => {
  const statusOption = columnModeOption?.map((item, key) => ({
    value: item.toString(),
    label: item,
  }));
  const [localValue, setLocalValue] = useState<ValueType | undefined>(
    value ? [value] : (undefined as any)
  );
  // đặt giá trị khi submit là id cuối
  const onChangeCustom = (values: ValueType) => {
    onChange(values as any, {} as any);
    setLocalValue(values);
  };

  useEffect(() => {
    if (!value) {
      setLocalValue(undefined);
    }
  }, [value]);
  // tìm path khi có initialValue
  return (
    <Select
      disabled={props.disabled}
      className={props.className}
      defaultValue={props.defaultValue}
      onChange={onChangeCustom as any}
      value={localValue || value}
      options={statusOption}
      allowClear
    />
  );
};
