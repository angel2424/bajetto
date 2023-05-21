import { auth } from "../config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import addData from "../docs/addData";

export default async function signUp(email, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password)
  } catch (e) {
    error = e;
  }

  return { result, error };
}
