import { auth } from "../config";
import { signOut } from "firebase/auth";
import addData from "../docs/addData";

export default async function signOutAuth() {
  let result = null,
    error = null;
  try {
    result = await signOut(auth);
    const { docResult, error } = await addData(cookies.user, {
      name: { firstName: formData.firstName, lastName: formData.lastName },
      email: formData.email,
      income: {
        amount: "",
        frequency: "",
        paymentDay: "",
      },
      savings: "",
      fixedExpenses: [],
      oneTimeExpenses: [],
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
