export const getAllReserves = async () => {
    let result = await (await fetch('http://192.168.129.72:5013/reserve/all', { method: "GET" })).json();
    return result
}