export default async function updatePay(pd){
    let res=await fetch(`http://localhost:8080/updatepay`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
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