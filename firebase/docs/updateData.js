import { db } from "../config";
import { doc, updateDoc } from "firebase/firestore";

export default async function updateData(id, data) {
  let updateDocResult = null,
    updateDocError = null;
  try {
    updateDocResult = await updateDoc(doc(db, "users", id), data);
  } catch (e) {
    updateDocError = e;
  }

  return { updateDocResult, updateDocError };
}
