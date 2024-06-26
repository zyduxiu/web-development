export default async function getschedule(date){
    let res=await fetch(`http://localhost:8080/getAppointDate?date=${date}`,{credentials: "include",});
    return res.json();
}