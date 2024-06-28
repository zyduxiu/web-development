export default async function getcart(pd){
    let query ="";
    query += `&page=${encodeURIComponent(pd.page)}`;
    query += `&size=${encodeURIComponent(pd.size)}`;
    let res=await fetch(`http://localhost:8080/cart?username=${query}`,{credentials: "include",});
    return res.json();
}