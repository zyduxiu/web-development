export async function handlesearchOrders(search){
    let query = `searchtitle=${encodeURIComponent(search.searchitem)}`;

    if (search.username) {
        query += `&username=${encodeURIComponent(search.username)}`;
    }

    if (search.startdate) {
        query += `&startdate=${encodeURIComponent(search.startdate)}`;
    }

    if (search.enddate) {
        query += `&enddate=${encodeURIComponent(search.enddate)}`;
    }

    let res = await fetch(`http://localhost:8080/searchthings?${query}`,{credentials: "include",});
    return res.json();
}