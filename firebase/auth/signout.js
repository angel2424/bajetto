import { auth } from "../config";
import { signOut } from "firebase/auth";

export default async function signOutAuth() {
  let result = null,
    error = null;
  try {
    result = await signOut(auth);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
