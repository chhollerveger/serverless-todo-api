export function converterToType<T>(data: any, type: new () => T): T {
  const taregt = new type();
  const parsedData = JSON.parse(data);
  Object.assign(taregt, parsedData);
  Object.keys(taregt).forEach((key) => taregt[key] === undefined && delete taregt[key]);
  return taregt;
}