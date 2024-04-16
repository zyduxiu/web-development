// export default async function getlogin(pd){
//     let res=await fetch(`http://localhost:8080/login`,{
//         method:'post',
//         headers:{
//            'Content-Type':'application/json'
//         },
//         body: JSON.stringify(pd)
//     });
//     return res.json();
// }
export default async function getlogin(pd){
    let res=await fetch(`http://localhost:8080/login?username=${pd.username}&password=${pd.password}`);
    return res.json();
}