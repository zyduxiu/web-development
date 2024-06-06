export default async function getcart(pd){
    let res=await fetch(`http://localhost:8080/order?username=${pd}`,{credentials: "include",});
    console.log(res);
    return res.json();

}