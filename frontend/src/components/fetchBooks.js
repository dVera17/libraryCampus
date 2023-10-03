export const getBooks = async () => {
    let result = await (await fetch('http://192.168.129.72:5013/book/all', { method: "GET" })).json();
    return result.data
}