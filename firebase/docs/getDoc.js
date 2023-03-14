import { db } from "../config";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

export default async function getDocument(id) {
  let docRef = doc(db, "users", id);

  let getDocResult = null,
    getDocError = null;
  try {
    getDocResult = await getDoc(docRef);
  } catch (e) {
    getDocError = e;
  }

  return { getDocResult, getDocError };
}
