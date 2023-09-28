export const getBooks = async () => {
    let result = await (await fetch('http://localhost:5010/book/all', { method: "GET" })).json();
    return result.data
}