import Image from "next/image";
import getDocument from "@/firebase/docs/getDoc";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function UserExpensesView() {
  const cookieStore = cookies();
  const user = cookieStore.get("user");

  const { getDocResult, getDocError } = await getDocument(user.value);
  const data = getDocResult.data();

  return (
    <main>
      <div className="mx-auto h-[calc(100svh-theme('spacing.24'))] max-w-8xl px-2 pt-10 pb-10 lg:pt-0 lg:pb-0 sm:px-5 lg:px-8 flex items-center justify-center justify-items-center flex-col lg:flex-row">
        <div className="lg:flex-1 px-10 lg:pr-20 lg:pl-0 mx-20">
          <Image
            src={"/income_illustration.jpg"}
            width={513}
            height={518.49}
            alt={"Illustration of women sitting"}
          />
        </div>
        <div className="lg:flex-1 pt-6 lg:pt-0 xl:ml-0 xl:px-16 lg:text-left px-5 w-full">
            <h1 className="text-gray-900 font-bold text-2xl">
            Now it’s time to add your fixed expenses.
            </h1>
            <p className="text-xl text-gray-500 mt-4">
                You can add as many as you need! If your salary is weekly, all your monthly expenses will be divided into 4, for each week. Don’t  worry if you forget one, you can add it later!
            </p>
            <Link href={"/user/expenses/add/concurrent"}>
                <button
                type="button"
                className="bg-blue-700 rounded-md py-3 px-4 w-full text-white mt-12"
                >
                    Next
                </button>
          </Link>
        </div>
      </div>
    </main>
  );
}