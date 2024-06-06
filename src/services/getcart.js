export default async function getcart(pd){
    let res=await fetch(`http://localhost:8080/cart?username=${pd}`,{credentials: "include",});
    return res.json();
}