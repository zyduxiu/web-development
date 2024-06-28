export async function handlesearchOrders(search){
    let query = `searchtitle=${encodeURIComponent(search.searchitem)}`;

    if (search.startdate) {
        query += `&startdate=${encodeURIComponent(search.startdate)}`;
    }

    if (search.enddate) {
        query += `&enddate=${encodeURIComponent(search.enddate)}`;
    }
    query += `&page=${encodeURIComponent(search.page)}`;
    query += `&size=${encodeURIComponent(search.size)}`;

    let res = await fetch(`http://localhost:8080/searchthings?${query}`,{credentials: "include",});
    return res.json();
}