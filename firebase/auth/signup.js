import { auth } from "../config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import addData from "../docs/addData";

export default async function signUp(email, password, formData) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const { docResult, docError } = addData(userCredential.user.uid, {
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

        if (docError) {
          console.log(docError);
        }
      }
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
}
