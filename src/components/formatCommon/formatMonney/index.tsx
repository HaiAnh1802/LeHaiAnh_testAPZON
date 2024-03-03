function formatMonney(value: number, currency: string) {
  return (
    value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + " " + currency
  );
}

export default formatMonney;
