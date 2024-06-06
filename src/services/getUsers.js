export async function getUsers(pd){
    let res=await fetch(`http://localhost:8080/getusers`,{credentials: "include",});
    return res.json();
}