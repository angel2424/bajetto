import Image from "next/image";
import getDocument from "@/firebase/docs/getDoc";
import { cookies } from "next/headers";
import IncomeForm from "@/components/income/incomeForm";

export default async function Income() {
  const cookieStore = cookies();
  const user = cookieStore.get("user");

  const { getDocResult, getDocError } = await getDocument(user?.value);
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
          <span className="text-xl text-gray-500 font-medium">
            Hello, {data?.name.firstName + " " + data?.name.lastName}
          </span>
          <h1 className="text-gray-900 font-bold text-2xl">
            What is your income?
          </h1>
          <IncomeForm userId={user.value} data={data} />
        </div>
      </div>
    </main>
  );
}
