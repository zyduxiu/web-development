export default async function getOrders(pd){
    let res=await fetch(`http://localhost:8080/getorders`,{credentials: "include",});
    console.log(res);
    return res.json();

}