export const getAllReserves = async () => {
    let result = await (await fetch('http://192.168.129.72:5013/reserve/all', { method: "GET" })).json();
    return result
}

export const getAccettedReserves = async () => {
    let result = await (await fetch('http://192.168.129.72:5013/reserve/r_accepted', { method: "GET" })).json();
    return result
}