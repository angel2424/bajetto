"use client";

import updateData from "@/firebase/docs/updateData";
import { arrayUnion } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExpensesForm({ userId }) {
  const router = useRouter();
  let date = new Date()
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    type: "",
    date: Date.now()
  });

  useEffect(() => {
    if(!userId) {
      router.push('/')
    }
  }, [router, userId])
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { updateDocResult, updateDocError } = await updateData(userId, {
      oneTimeExpenses: arrayUnion(formData)
    });

    if (updateDocError) {
      return console.log(updateDocError);
    }
    
    setFormData({
      name: "",
      amount: "",
      type: ""
    })
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
          <label htmlFor="name" className="sr-only">
            Expense name
          </label>
          <input
            id="expense_name"
            name="expense_name"
            type="text"
            required
            className="relative block w-full h-12 mb-6 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-md"
            placeholder="Expense name"
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="amount" className="sr-only">
            Amount
          </label>
          <input
            id="amount"
            name="amount"
            type="text"
            required
            className="relative block w-full h-12 mb-6 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-md"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                amount: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="type" className="sr-only">
            Select the type of expense
          </label>
          <select
            id="type"
            name="type"
            required
            className="relative block w-full h-12 mb-6 bg-white rounded-md border border-gray-300 px-3 py-2 text-blue-600 font-semibold focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-md"
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value,
              })
            }
          >
            <option value="" defaultValue>
              Type
            </option>
            <option value="groceries">Groceries</option>
            <option value="clothing">Clothing</option>
            <option value="education">Education</option>
            <option value="services">Services</option>
            <option value="others">Others</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-700 rounded-md py-3 mt-3 px-4 w-full text-white hover:scale-[101.5%] transition duration-150"
        >
          Add
        </button>
        <Link href={'/dashboard'}>
          <button
            type="submit"
            className="bg-white border border-blue-700 hover:border-blue-500 hover:text-blue-500 transition duration-200 hover:scale-[101.5%] rounded-md py-3 mt-3 px-4 w-full text-blue-700"
          >
            Done
          </button>
        </Link>
      </div>
    </form>
  );
}
