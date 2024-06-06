export async function getStastic(search){
    let query = `&username=${encodeURIComponent(search.username)}`;

    if (search.startdate) {
        query += `&startdate=${encodeURIComponent(search.startdate)}`;
    }

    if (search.enddate) {
        query += `&enddate=${encodeURIComponent(search.enddate)}`;
    }

    let res = await fetch(`http://localhost:8080/getStastics?${query}`,{credentials: "include",});
    return res.json();
}