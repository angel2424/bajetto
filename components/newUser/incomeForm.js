"use client";

import updateData from "@/firebase/docs/updateData";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function IncomeForm({ userId }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    amount: "",
    payday: "",
    frequency: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { updateDocResult, updateDocError } = await updateData(userId, {
      income: {
        ...formData,
      },
    });

    if (updateDocError) {
      return console.log(updateDocError);
    }

    if (formData.amount !== "" && formData.payday !== "") {
      setFormData({
        amount: "",
        payday: "",
        frequency: "",
      });
    } else {
      console.log("Passwords don't match");
    }
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
            Income
          </label>
          <input
            id="amount"
            name="amount"
            type="text"
            required
            className="relative block w-full h-12 mb-6 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-md"
            placeholder="Income"
            value={formData.amount}
            onChange={(e) => {
              setFormData({
                ...formData,
                amount: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="payday" className="sr-only">
            Pay Day
          </label>
          <input
            id="payday"
            name="payday"
            type="text"
            required
            className="relative block w-full h-12 mb-6 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-md"
            placeholder="Payday"
            value={formData.payday}
            onChange={(e) =>
              setFormData({
                ...formData,
                payday: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="frequency" className="sr-only">
            Select either weekly, biweekly or montly payment
          </label>
          <select
            id="frequency"
            name="frequency"
            required
            className="relative block w-full h-12 mb-6 bg-white rounded-md border border-gray-300 px-3 py-2 text-blue-600 font-semibold focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-md"
            value={formData.frequency}
            onChange={(e) =>
              setFormData({
                ...formData,
                frequency: e.target.value,
              })
            }
          >
            <option value="monthly" defaultValue>
              Monthly
            </option>
            <option value="weekly">Weekly</option>
            <option value="bi-week">Bi-week</option>
          </select>
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
