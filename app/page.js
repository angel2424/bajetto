"use client";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <main>
      <div className="container mx-auto h-[calc(100svh-theme('spacing.24'))] sm:h-screen lg:h-[calc(100svh-theme('spacing.24'))]  max-w-8xl px-2 pt-10 lg:pt-0 sm:px-6 lg:px-8 flex items-center justify-center flex-col lg:flex-row">
        <div className="lg:flex-1 px-14 py-8 relative h-full w-full">
          <Image
            src={"/landing_illustration.jpg"}
            fill
            alt={"Illustration of man standing in front of data"}
            className="object-contain lg:py-10 lg:px-10"
          />
        </div>
        <div className="lg:flex-1 pt-16 lg:pt-0 xl:ml-0 xl:px-16 text-center lg:text-left px-5">
          <h1 className="text-gray-900 font-bold text-4xl">
            Manage your budget with ease.
          </h1>
          <p className="text-xl text-gray-500 mt-4">
            Bajetto is a simple budget manager I built to keep better track of
            my finances. Since I didn’t like what was out there, I just built my
            own :)
          </p>
          <Link href={"/login"}>
            <button
              type="button"
              className="bg-blue-700 rounded-md py-3 px-4 w-full text-white mt-12"
            >
              Login
            </button>
          </Link>
          <div className="flex items-center justify-center mt-4 pb-10">
            <p className="text-gray-600 font-medium">Don’t have an account?</p>
            <Link href={"/signup"} className="ml-2">
              <span className="text-blue-800 font-bold">Sign up</span>{" "}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
