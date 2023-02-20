import { auth } from "../config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async function signUp(email, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        console.log(userCredential.user);
      }
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
}
