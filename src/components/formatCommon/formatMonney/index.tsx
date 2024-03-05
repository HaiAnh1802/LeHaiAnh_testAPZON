function formatMonney(value: number, currency: string) {
  return value
    ? value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + " " + currency
    : "0 VNĐ";
}

export default formatMonney;
