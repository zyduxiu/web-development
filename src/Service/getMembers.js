export default async function getMembers(){
    let res=await fetch(`http://localhost:8080/api/members/getallmembers`,{credentials: "include",});
    return res.json();
}