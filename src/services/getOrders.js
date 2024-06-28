export default async function getOrders(page,size){
    let params = new URLSearchParams();
    params.append('page', page);
    params.append('size', size);
    let res=await fetch(`http://localhost:8080/getorders?${params.toString()}`,{credentials: "include",});
    console.log(res);
    return res.json();

}

//  function getbooks(page,size){
//     let params = new URLSearchParams();
//     params.append('page', page);
//     params.append('size', size);
//     let res=await fetch( `http://localhost:8080/home?${params.toString()}`,{
//         method:'GET',
//         credentials: "include",
//     });
//     return res.json();
// }