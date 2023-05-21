"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaSlidersH } from "react-icons/fa";
import Image from "next/image";
import signOutAuth from "@/firebase/auth/signout";
import Link from "next/link";
import { useRouter } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const router = useRouter()
  const handleSignOut = async (e) => {
    e.preventDefault();

    const { result, error } = await signOutAuth();

    if (error) {
      return console.log(error);
    }

    // else successful
    router.push('/')
  };

  return (
    <Disclosure as="nav" className="bg-white mb-2">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex sm:h-24 h-20 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md mx-2 p-2 text-gray-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href={"/"} className="text-2xl font-bold">
                    Bajetto
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block w-full">
                  <div className="flex space-x-6 h-full items-center justify-center">
                    <a
                      href="/dashboard"
                      className={classNames(
                        "bg-white text-grey-600 hover:text-blue-700 text-md font-medium"
                      )}
                    >
                      Dashboard
                    </a>
                    <a
                      href="/"
                      className={classNames(
                        "bg-white text-grey-600 hover:text-blue-700 text-md font-medium"
                      )}
                    >
                      Expenses
                    </a>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 md:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src="https://res.cloudinary.com/dpnv2uar8/image/upload/v1675726490/portrait_x2oyeq.jpg"
                        alt=""
                        width={40}
                        height={40}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleSignOut}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile Nav */}

          <Disclosure.Panel className="sm:hidden bg-white w-full h-screen fixed z-30 font-medium text-xl">
            <div className="flex flex-col justify-between h-[calc(100svh-theme('spacing.28'))] pb-8">
              <Link
                href="/"
                className="space-y-1 px-10 py-3 flex items-center mt-2"
              >
                <Disclosure.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-12 w-12 rounded-full"
                    src="https://res.cloudinary.com/dpnv2uar8/image/upload/v1675726490/portrait_x2oyeq.jpg"
                    alt=""
                    width={40}
                    height={40}
                  />
                </Disclosure.Button>
                <div className="font-semibold ml-4 flex flex-col justify-center">
                  <span>Hello Angel!</span>
                </div>
              </Link>
              <div className="py-10">
                <div className="space-y-1 px-10 py-3">
                  <Disclosure.Button
                    as="a"
                    href="/dashboard"
                    className={classNames("text-gray-700"
                    )}
                  >
                    Dashboard
                  </Disclosure.Button>
                </div>
                <div className="space-y-4 px-10 py-3">
                  <Disclosure.Button
                    as="a"
                    href="/"
                    className={classNames(
                      "text-gray-70"
                    )}
                  >
                    Concurrent Expenses
                  </Disclosure.Button>
                </div>
              </div>
              <div className="px-10 pt-3 mt-auto">
                <Disclosure.Button
                  as="a"
                  href="/"
                  className={classNames(
                    "text-gray-70 mt-auto h-full flex items-center"
                  )}
                >
                  <FaSlidersH className="mr-3" />
                  Settings
                </Disclosure.Button>
              </div>              
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
