import { auth } from "../config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import addData from "@/firebase/docs/addData";

export default async function googleSignUp() {
  const provider = new GoogleAuthProvider();
  let user = null,
    error = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
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
      const error = e
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(e);
      // ...
    });
  
  return { user, error };
}
