"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronRight, FaShoppingCart, FaSchool, FaWrench, FaTicketAlt, FaUser, FaTshirt } from 'react-icons/fa'
import IncomeModal from "../modals/incomeModal";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase/config";

export default async function DashboardComponent({leftover, data, expensesSum}) {
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false)

  let dollarMXLocale = Intl.NumberFormat('es-MX', {
    style: "currency",
    currency: "MXN",
  })

  useEffect(() => {
    if (data?.income.amount === '') {
      setIsIncomeModalOpen(true)
    } else {
      setIsIncomeModalOpen(false)
    }
  }, [data?.income.amount])
  
  return (
    <div className="px-0 md:px-8 pt-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-8">
        <p className="text-md text-gray-400 my-1">Total left</p>
        <h2 className="text-4xl font-extrabold sm:text-5xl text-gray-700">
          { data.income.amount === '' ?
            '$0' :
            dollarMXLocale.format(leftover)
          }
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4 my-8">
        <button className="border border-gray-200 rounded-lg py-4 px-4 ">
          <Link href={'/income'} className="flex items-center justify-between" >      
            Edit income 
            <FaChevronRight className="text-blue-700"/>
          </Link>
        </button>
        <button className="border border-gray-200 rounded-lg py-4 px-4 flex items-center justify-between">
          Savings
          <FaChevronRight className="text-blue-700"/>
        </button>
        <button className="border border-gray-200 rounded-lg w-full py-4 px-4 flex items-center justify-between col-span-2">
          View concurrent expenses
          <FaChevronRight className="text-blue-700"/>
        </button>
      </div>
      <div className="pb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-400 text-md">Recent one-time purchases</h2>
          { data.oneTimeExpenses.length === 0 ? null :
            <button className="text-blue-700 text-sm flex items-center">
              View all 
              <FaChevronRight className="text-blue-700 ml-2"/>
            </button>
          }
        </div>
        <div>
          {
            data?.oneTimeExpenses.reverse().slice(0, 3).map((item, index) => (
              <div key={index} className="flex items-center py-5 border-b">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-blue-700">
                  {
                    item.type === 'groceries' ? <FaShoppingCart /> 
                    : item.type === 'clothing' ? <FaTshirt /> 
                    : item.type === 'education' ? <FaSchool /> 
                    : item.type === 'services' ? <FaWrench /> 
                    : item.type === 'entertainment' ? <FaTicketAlt /> 
                    : <FaUser /> 
                  }
                </div>
                <p className="ml-4 font-semibold">{item.name}</p>
                <p className="font-semibold ml-auto">{dollarMXLocale.format(item.amount)}</p>
              </div>
            ))
          }
        </div>

        {/* ----- No one time expenses message ----- */}

        {
          data.oneTimeExpenses.length === 0 ?
          <div className="flex justify-center py-20">
            <p className="text-gray-700 text-xl">No recent purchases 🙂</p>
          </div>
          : null
        }

        <IncomeModal onClick={() => setIsIncomeModalOpen(false)} isOpen={isIncomeModalOpen}/>

        <Link href='/user/expenses/add/one-time'>    
          <button
            type="submit"
            className="bg-blue-700 rounded-md py-3 mt-8 px-4 w-full text-white hover:scale-[101.5%] transition duration-150"
          >
            Add purchase
          </button>
        </Link>
      </div>
    </div>
  );
}
