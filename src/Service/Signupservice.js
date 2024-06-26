export default async function getlogin(pd){
    let res=await fetch(`http://localhost:8080/login?username=${pd.username}&password=${pd.password}`,{credentials:"include"});
    return res.json();
}