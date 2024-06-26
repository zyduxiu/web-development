export default async function getAllAppointments(){
    let res=await fetch(`http://localhost:8080/getAllAppointments`,{credentials: "include",});
    return res.json();
}