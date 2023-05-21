"use client";

import updateData from "@/firebase/docs/updateData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SavingsForm({ userId }) {
  const router = useRouter();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if(!userId) {
      router.push('/')
    }
  }, [router, userId])
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { updateDocResult, updateDocError } = await updateData(userId, {
      savings: Number(formData)
    });

    if (updateDocError) {
      return console.log(updateDocError);
    }

    if (formData !== null) {
      setFormData(null);
    }
    router.push('/user/expenses/view')
  };

  return (
    <form
      className="mt-8 space-y-6"
      action="#"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="my-12">
        <div>
          <label htmlFor="amount" className="sr-only">
            Savings
          </label>
          <input
            id="savings"
            name="savings"
            type="text"
            className="relative block w-full h-12 mb-6 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-md"
            placeholder="Amount"
            value={formData}
            onChange={(e) => {
              setFormData(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 rounded-md py-3 mt-3 px-4 w-full text-white"
        >
          Next
        </button>
      </div>
    </form>
  );
}