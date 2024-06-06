export default async function checksession(pd){
    let res=await fetch(`http://localhost:8080/checksession`, {
        credentials: "include",
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
}