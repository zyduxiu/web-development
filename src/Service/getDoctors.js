export default async function getDoctors(){
    let res=await fetch(`http://localhost:8080/getDoctor`,{credentials: "include",});
    return res.json();
}