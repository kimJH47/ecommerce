export function convertToSearchParams(records: Record<string, any>): URLSearchParams {
  const params = new URLSearchParams();
  Object.keys(records).forEach(key => {
    if (records[key] !== undefined && records[key] !== null) {
      if (Array.isArray(records[key])) {
        records[key].forEach((item: any) => {
          params.append(key, String(item));
        });
      } else {
        params.append(key, String(records[key]));
      }
    }
  });
  return params
}