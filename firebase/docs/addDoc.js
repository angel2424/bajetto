import { db } from "../config";
import { doc, setDoc } from "firebase/firestore";

export default async function addDoc(id, data) {
  let docResult = null,
    docError = null;
  try {
    docResult = await setDoc(doc(db, "users", id), data);
  } catch (e) {
    docError = e;
  }

  return { docResult, docError };
}
