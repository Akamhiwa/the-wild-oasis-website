// import { NextResponse } from "next/server";

import { auth } from "./app/_lib/auth"

// export const middleware=(request)=>{
//     console.log(request);
//     return NextResponse.redirect(new URL('/about',request.url))
    
// }
export const middleware=auth;  //this is the part where only signed in user can see their profile 
export const config={
    matcher:['/account',]
}