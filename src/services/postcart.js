export default async function postcart(pd){
    let res=await fetch(`http://localhost:8080/postcart`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(pd),
        credentials: "include",
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    console.log(res);
  //  return await res.json();
}