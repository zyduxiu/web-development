export default async function buybook(pd){
    let res=await fetch(`http://localhost:8080/buybook`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },credentials: "include",

        body:JSON.stringify(pd),
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    console.log(res);
    //  return await res.json();
}