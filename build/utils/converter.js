export function converterToType(data, type) {
    const taregt = new type();
    const parsedData = JSON.parse(data);
    Object.assign(taregt, parsedData);
    Object.keys(taregt).forEach((key) => taregt[key] === undefined && delete taregt[key]);
    return taregt;
}
//# sourceMappingURL=converter.js.map