"use client";
import { FaGoogle, FaApple, FaFacebookF, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import signIn from "@/firebase/auth/login";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CookiesProvider, useCookies } from "react-cookie";
import twitterAuth from "../../firebase/auth/twitterAuth";
import facebookAuth from "../../firebase/auth/facebookAuth";
import googleSignIn from "../../firebase/auth/googleSignIn";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { result, error } = await signIn(formData.email, formData.password);

    if (error) {
      return console.log(error);
    }

    
    // else successful
    router.push("/dashboard");
  };
  
  const handleGoogle = () => {
    const { user, error } = googleSignIn()
    console.log(user)
    

    if (error) {
      return console.log(error);
    }

    function userSigned() {
      if(cookie.user === undefined) {
        userSigned()
      } else {
        router.push("/dahsboard")
      }
    } 
  }

  const handleTwitter = () => {
    const { user, error } = twitterAuth()
    console.log(user)
    

    if (error) {
      return console.log(error);
    }

    router.push("/dashboard");
  }

  const handleFacebook = () => {
    const { user, error } = facebookAuth()
    console.log(user)
    

    if (error) {
      return console.log(error);
    }

    router.push("/dashboard");
  }

  return (
    <main>
      <div className="mx-auto h-[calc(100svh-theme('spacing.24'))] max-w-8xl px-2 pt-10 pb-10 sm:px-5 lg:px-28 flex items-center justify-center justify-items-center flex-col lg:flex-row">
        <div className="lg:flex-1 px-10 lg:pr-20 lg:pl-0 mx-20">
          <Image
            src={"/auth_illustration.png"}
            width={513}
            height={518.49}
            alt={"Illustration of women sitting"}
          />
        </div>
        <div className="lg:flex-1 pt-6 lg:pt-0 xl:ml-0 xl:px-16 text-center lg:text-left px-5 w-full">
          <h1 className="text-gray-900 font-bold text-4xl">Welcome back!</h1>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full h-12 mb-6 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-md"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full h-12 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-md"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-blue-700 rounded-md py-3 px-4 w-full text-white"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex items-center mt-8">
            <span className="bg-gray-200 h-[1px] w-full mx-2"></span>
            <p className="text-gray-400">Or</p>
            <span className="bg-gray-200 h-[1px] w-full mx-2"></span>
          </div>
          <div className="flex mt-8 mx-auto w-full justify-center">
            <button
              onClick={handleGoogle}
              type="button"
              aria-current="page"
              className="relative z-10 inline-flex items-center border border-gray-200 hover:border-blue-700 hover:text-gray-800 transition rounded-lg px-4 py-4 text-md font-medium text-gray-800 focus:z-20 mx-4"
            >
              <FaGoogle />
            </button>
            <button
              onClick={handleTwitter}
              type="button"
              aria-current="page"
              className="relative z-10 inline-flex items-center border border-gray-200 hover:border-blue-700 hover:text-gray-800 transition rounded-lg px-4 py-4 text-md font-medium text-gray-800 focus:z-20 mx-4"
            >
              <FaTwitter />
            </button>
            <button
              onClick={handleFacebook}
              type="button"
              aria-current="page"
              className="relative z-10 inline-flex items-center border border-gray-200  hover:border-blue-700 hover:text-gray-800 transition rounded-lg px-4 py-4 text-md font-medium text-gray-800 focus:z-20 mx-4"
            >
              <FaFacebookF />
            </button>
          </div>
          <div className="flex justify-center">
            <p className="text-gray-600 font-regular mt-8">
              Don’t have an account?{" "}
              <Link href={"/signup"}>
                <span className="text-blue-800 font-semibold">Sign up</span>{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
