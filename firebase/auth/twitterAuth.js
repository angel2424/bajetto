import { auth } from "../config";
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import addData from "@/firebase/docs/addData";

export default async function twitterAuth() {
    const provider = new TwitterAuthProvider();
    let user = null,
        error = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;
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
          const credential = TwitterAuthProvider.credentialFromError(e);

          // ...
    });
  
    return { user, error };
}
