//NEXTAUTH_URL=http://localhost:3000/
//NEXTAUTH_SECRET=38f9c3099a80e0a17a75685e0033d414
//AUTH_GOOGLE_ID=81310676143-a46oud4ahmj1gg0nt397vn7qa1fv1srm.apps.googleusercontent.com
//AUTH_GOOGLE_SECRET=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

import NextAuth from "next-auth";
import Google from "next-auth/providers/google" 
import { createGuest, getGuest } from "./data-service";
// const AUTH_GOOGLE_ID='81310676143-a46oud4ahmj1gg0nt397vn7qa1fv1srm.apps.googleusercontent.com'
// const AUTH_GOOGLE_SECRET='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'
const authConfig={
    providers: [
        Google({
            clientId:process.env.AUTH_GOOGLE_ID ,
            clientSecret:process.env.AUTH_GOOGLE_SECRET
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        authorized({ auth, request }) {
          return !!auth?.user; //if there is user it is true if not false
        },
        async signIn({ user, account, profile }) {
          try {
            const existingGuest = await getGuest(user.email);
    
            if (!existingGuest)
              await createGuest({ email: user.email, FullName: user.name });
    
            return true;
          } catch {
            return false;
          }
        },
       
        async session({ session, user }) {
          const guest = await getGuest(session.user.email);
          session.user.guestId = guest.id;
          return session;
        },
      },
      pages: { //creates custom page for login 
        signIn: "/login",
      },
}
export const 
{  auth,
   signIn,
   signOut,
    handlers:{GET,POST}
}=NextAuth(authConfig);

//auth simply contains the info of th logged in user
 