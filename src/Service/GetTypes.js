export default async function getTypes(date){
    let res=await fetch(`http://localhost:8080/getType`,{credentials: "include",});
    return res.json();
}