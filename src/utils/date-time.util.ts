export function convertDateTime(inputDate: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return new Date(inputDate).toLocaleDateString("fa-IR-u-nu-latn", options);
}

export function convertDate(inputDate: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(inputDate).toLocaleDateString("fa-IR-u-nu-latn", options);
}
