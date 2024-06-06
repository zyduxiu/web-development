export default async function forbiduser(pd){
    let res=await fetch(`http://localhost:8080/forbiduser`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(pd),
        credentials: "include"
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    console.log(res.body)
    return res;
    //  return await res.json();
}