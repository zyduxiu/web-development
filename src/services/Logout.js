export async function Logout(){
    let res=await fetch(`http://localhost:8080/logout`,{credentials: "include",});
    return res.json();
}