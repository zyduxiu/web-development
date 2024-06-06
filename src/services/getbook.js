import { DUMMY_RESPONSE, PREFIX, getJson, post } from "./common";
const jwt = localStorage.getItem('jwt');
export default async function detail(pd){
    console.log(jwt)
    let res=await fetch(`http://localhost:8080/book?id=${pd}`, {
            credentials: "include",
    });
    return res.json();
}