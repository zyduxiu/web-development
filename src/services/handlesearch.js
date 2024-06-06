export async function handlesearch(pd){
    let res=await fetch(`http://localhost:8080/search?searchtitle=${pd}`,{credentials: "include",});
    return res.json();
}