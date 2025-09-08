export function isNumeric(value: string): boolean {
  return /^-?\d+$/.test(value);
}

export function isBoolean(value: string): boolean {
  return ["true", "false"].includes(value);
}
