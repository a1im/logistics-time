export const normalizeNamesGroup = data => ({
    name: data.G,
});
export const normalizeNamesGoods = data => ({
    name: data.N,
});
export const normalizeDataGoods = data => ({
    id: data.T,
    groupId: data.G,
    priceUsd: data.C,
    amount: data.P,
});
