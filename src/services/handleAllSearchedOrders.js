export async function handleAllSearchedOrders(search){
    let query = `searchtitle=${encodeURIComponent(search.searchitem)}`;



    if (search.startdate) {
        query += `&startdate=${encodeURIComponent(search.startdate)}`;
    }

    if (search.enddate) {
        query += `&enddate=${encodeURIComponent(search.enddate)}`;
    }

    let res = await fetch(`http://localhost:8080/searchallthings?${query}`,{credentials: "include",});
    return res.json();
}