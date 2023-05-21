import getDocument from "@/firebase/docs/getDoc";
import { cookies } from "next/headers";
import DashboardComponent from "../../components/dashboard";
import { useAuthStore } from '@/stores/store';

export default async function Dashboard() {

  let dollarMXLocale = Intl.NumberFormat('es-MX', {
    style: "currency",
    currency: "MXN",
  })
  const cookieStore = cookies();
  const user = cookieStore.get("user");
  
  if(cookieStore.get("user") === undefined) {
    return
  }

  const { getDocResult, getDocError } = await getDocument(user?.value);
  const data = getDocResult.data();

  let expenses = []

  data?.fixedExpenses.forEach(expense => {
    expenses.push(Number(expense.amount))
  })

  data?.oneTimeExpenses.forEach(expense => {
    expenses.push(Number(expense?.amount))
  })

  let expensesSum = expenses.reduce(
    (accumulator, currentValue) => accumulator + currentValue, 0);
  let leftover = Number(data?.income.amount) - expensesSum 
  
  return (
    <div className="px-8 pt-4">
      <DashboardComponent leftover={leftover} data={data} expensesSum={expensesSum} />
    </div>
  );
}
