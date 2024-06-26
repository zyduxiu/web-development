export default async function getAllCards(){
    let res=await fetch(`http://localhost:8080/api/members/getAllCards`,{credentials: "include",});
    return res.json();
}