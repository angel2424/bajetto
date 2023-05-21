import { auth } from "../config";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import addData from "@/firebase/docs/addData";

export default async function facebookAuth() {
    const provider = new FacebookAuthProvider();
    let user = null,
        error = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      // The signed-in user info.
        const user = result.user;
        setCookie("user", user.uid, {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        })
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((e) => {
          // Handle Errors here.
          error = e;
          console.log(e)
          console.log(e.message)     
          const credential = FacebookAuthProvider.credentialFromError(e);

          // ...
    });
  
    return { user, error };
}
