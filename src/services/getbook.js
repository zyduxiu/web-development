import { DUMMY_RESPONSE, PREFIX, getJson, post } from "./common";

export default async function detail(pd){
    let res=await fetch(`http://localhost:8080/book?id=${pd}`);
    return res.json();
}
export async function getbooks(){
    let res=await fetch('http://localhost:8080/home');
    return res.json();
}