export default async function addnewbook(pd){
    let res=await fetch(`http://localhost:8080/addbook`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        credentials: "include",
        body:JSON.stringify(pd),
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    console.log(res);
    //  return await res.json();
}