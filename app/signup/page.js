"use client";
import { FaGoogle, FaApple, FaFacebookF, FaRegEnvelope } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <main>
      <div className="mx-auto h-[100svh] lg:h-screen max-w-8xl px-2 pt-10 pb-10 lg:pt-0 lg:pb-0 sm:px-5 lg:px-8 flex items-center justify-center justify-items-center flex-col lg:flex-row">
        <div className="lg:flex-1 px-10 lg:pr-20 lg:pl-0 mx-20">
          <Image
            src={"/auth_illustration.png"}
            width={513}
            height={518.49}
            alt={"Illustration of women sitting"}
          />
        </div>
        <div className="lg:flex-1 pt-6 lg:pt-0 xl:ml-0 xl:px-16 text-center lg:text-left px-5 w-full">
          <h1 className="text-gray-900 font-bold text-4xl">
            Create an account
          </h1>
          <div className="mt-8 mx-auto w-full inline-block">
            <Link
              href="/"
              aria-current="page"
              className="relative z-10 inline-flex items-center border justify-center border-gray-600 hover:border-blue-700 hover:text-gray-800 transition rounded-lg px-4 py-4 text-md font-medium text-gray-800 focus:z-20 w-full my-3"
            >
              <FaGoogle className="mr-4" />
              Continue with Google
            </Link>
            <Link
              href="/"
              aria-current="page"
              className="relative z-10 inline-flex items-center justify-center border border-gray-600 hover:border-blue-700 hover:text-gray-800 transition rounded-lg px-4 py-4 text-md font-medium text-gray-800 focus:z-20 w-full my-3"
            >
              <FaApple className="mr-4" />
              Continue with Apple
            </Link>
            <Link
              href="/"
              aria-current="page"
              className="relative z-10 inline-flex items-center border justify-center border-gray-600  hover:border-blue-700 hover:text-gray-800 transition rounded-lg px-4 py-4 text-md font-medium text-gray-800 focus:z-20 w-full my-3"
            >
              <FaFacebookF className="mr-4" />
              Continue with Facebook
            </Link>
          </div>
          <div className="flex items-center mt-8">
            <span className="bg-gray-200 h-[1px] w-full mx-2"></span>
            <p className="text-gray-400">Or</p>
            <span className="bg-gray-200 h-[1px] w-full mx-2"></span>
          </div>
          <div className="mt-8">
            <Link href={"/signup/email-signup"}>
              <button
                type="button"
                className="bg-blue-700 rounded-md py-3 px-4 w-full text-white flex justify-center items-center"
              >
                <FaRegEnvelope className="mr-6" size={22} />
                Sign up with Email
              </button>
            </Link>
          </div>
          <div className="flex justify-center">
            <p className="text-gray-600 font-regular mt-8">
              Already have an account?{" "}
              <Link href={"/login"}>
                <span className="text-blue-800 font-semibold">Login</span>{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
