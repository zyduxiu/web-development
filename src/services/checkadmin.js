export default async function checkadmin(pd){
    let res=await fetch(`http://localhost:8080/checkadmin`, {
        credentials: "include",
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
}