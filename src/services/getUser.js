export async function getUser(pd){
    let res=await fetch(`http://localhost:8080/getuser?username=${pd}`,{credentials: "include",});
    return res.json();
}