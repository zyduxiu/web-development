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
    let response =await fetch(`http://localhost:8080/process-login`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:"include",
        body:JSON.stringify(pd),
        //credentials:'include',
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        const userType=data.userType;
        const name=data.username;
        const expires = new Date(Date.now() + 3600*12*2* 60 * 1000); // 有效期为7天
        localStorage.setItem('userType',userType);

    } else {
        // 处理登录失败
    }
    return response;
}