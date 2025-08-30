const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

export function convertDateTime(inputDate: string) {
  return new Date(inputDate).toLocaleDateString("fa-IR-u-nu-latn", options);
}
