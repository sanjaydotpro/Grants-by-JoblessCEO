
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function snakeCase(string: string) {
  return string.toLowerCase().replace(/ /g, "_");
}

export function kebabCase(string: string) {
  return string.toLowerCase().replace(/ /g, "-");
}

export function validateUUIDs(ids: string[]) {
  return ids.every((id) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
  );
}

export function validateSingleUUID(id: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    id
  );
}

export function convertBigIntToString(obj: any) {
  for (const key in obj) {
    if (typeof obj[key] === "bigint") {
      obj[key] = obj[key].toString();
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      convertBigIntToString(obj[key]);
    }
  }
}

export function isArrayOfNumbers(arr: any[]): arr is number[] {
  return arr.every((item) => typeof item === "number");
}
