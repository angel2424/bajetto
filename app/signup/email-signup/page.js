"use client";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import signUp from "@/firebase/auth/signup";
import addDoc from "@/firebase/docs/addDoc";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.confirmPassword === formData.password) {
      const { result, error } = await signUp(formData.email, formData.password);

      const { docResult, docError } = await addDoc(user?.uid, {
        name: { firstName: formData.firstName, lastName: formData.lastName },
        email: formData.email,
        income: {
          amount: "",
          frequency: "",
          paymentDay: "",
        },
        savings: "",
        fixedExpenses: [],
        oneTimeExpenses: [],
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      if (error) {
        return console.log(error);
      } else if (docError) {
        console.log(docError);
      }

      console.log(result);
      console.log(docResult);
      router.push("/dashboard");
    } else {
      console.log("Passwords don't match");
    }
  };

  return (
    <main>
      <div className="mx-auto h-full max-h-screen lg:h-screen max-w-8xl px-2 pb-10 lg:pt-0 lg:pb-0 sm:px-5 lg:px-8 flex items-center justify-center justify-items-center flex-col lg:flex-row">
        <div className="lg:flex-1 px-10 lg:pr-20 lg:pl-0 mx-20">
          <Image
            src={"/auth_illustration.png"}
            width={513}
            height={518.49}
            alt={"Illustration of women sitting"}
          />
        </div>
        <div className="lg:flex-1 pt-2 lg:pt-0 xl:ml-0 xl:px-16 text-center lg:text-left px-5 w-full">
          <h1 className="text-gray-900 font-bold text-4xl flex items-center">
            <Link href={"/signup"}>
              <FaArrowLeft size={20} className="mr-6 mt-1" />
            </Link>{" "}
            Create an account
          </h1>
          <form
            className="mt-8 space-y-6"
            action="#"
            onSubmit={handleSubmit}
            method="POST"
          >
            <div className="my-12">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="relative block w-full h-12 mb-6 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-md"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="relative block w-full h-12 mb-6 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-md"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
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
                  className="relative block w-full h-12 mb-6 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-md"
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
              <div>
                <label htmlFor="password" className="sr-only">
                  Current Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full h-12 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-md"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-700 rounded-md py-3 px-4 w-full text-white"
              >
                Sign Up
              </button>
            </div>
          </form>
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
