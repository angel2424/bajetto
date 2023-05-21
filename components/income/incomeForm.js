"use client";

import updateData from "@/firebase/docs/updateData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function IncomeForm({ userId, data }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    amount: data.income.amount,
    payday: data.income.payday,
    frequency: data.income.frequency,
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
    }
    
    router.push('/dashboard')
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
        { formData.frequency === 'weekly' ?
          <div>
            <label htmlFor="frequency" className="sr-only">
              Select the day of the week you get paid
            </label>
            <select
              id="payday"
              name="payday"
              required
              className="relative block w-full h-12 mb-6 bg-white rounded-md border border-gray-300 px-3 py-2 text-blue-600 font-semibold focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-md"
              value={formData.payday}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  payday: e.target.value,
                })
              }
            >
              <option value="0" defaultValue>
                Sunday
              </option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
            </select>
          </div>
          :
          null
        }
        <button
          type="submit"
          className="bg-blue-700 rounded-md py-3 mt-3 px-4 w-full text-white"
        >
          Save
        </button>
        <Link href={'/dashboard'}>
          <button
            type="button"
            className="bg-white border border-red-500 hover:border-red-500 hover:text-red-400 transition duration-200 hover:scale-[101.5%] rounded-md py-3 mt-3 px-4 w-full text-red-500"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}
