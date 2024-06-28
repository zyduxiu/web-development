export async function getUserBookStastic(search){
    let query='';

    if (search.startdate) {query += `&startdate=${encodeURIComponent(search.startdate)}`;}

    if (search.enddate) {
        query += `&enddate=${encodeURIComponent(search.enddate)}`;
    }

    let res = await fetch(`http://localhost:8080/getAllUserBookStastics?${query}`,{credentials: "include",});
    return res.json();
}