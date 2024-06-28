export async function handlesearch(search,page,size){
    let url = new URL(`http://localhost:8080/search`);
    url.searchParams.append('searchtitle', search);
    url.searchParams.append('page', page);
    url.searchParams.append('size', size);

    let res = await fetch(url, {
        credentials: "include",
    });
    return res.json();
}