export default async function putcart(pd){
    let res=await fetch(`http://localhost:8080/cartitem`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        ,
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