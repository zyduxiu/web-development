export default async function getAccounts(){
    let res=await fetch(`http://localhost:8080/getAccount`,{credentials: "include",});
    return res.json();
}