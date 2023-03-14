"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import signOutAuth from "@/firebase/auth/signout";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const handleSignOut = async (e) => {
    e.preventDefault();

    const { result, error } = await signOutAuth();

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
  };

  return (
    <Disclosure as="nav" className="bg-white static">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-24 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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

          <Disclosure.Panel className="sm:hidden bg-white w-full h-screen fixed z-30">
            <div className="space-y-1 px-10 py-3">
              <Disclosure.Button
                as="a"
                href="/dashboard"
                className={classNames(
                  "text-gray-700 hover:text-blue-800 font-medium text-xl"
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
                  "text-gray-700 hover:text-blue-800 font-medium text-xl"
                )}
              >
                Expenses
              </Disclosure.Button>
            </div>
            <Link
              href="/"
              className="space-y-1 px-10 py-3 flex items-center mt-10"
            >
              <Disclosure.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <Image
                  className="h-10 w-10 rounded-full"
                  src="https://res.cloudinary.com/dpnv2uar8/image/upload/v1675726490/portrait_x2oyeq.jpg"
                  alt=""
                  width={40}
                  height={40}
                />
              </Disclosure.Button>
              <Disclosure.Button className="font-semibold ml-4">
                View profile
              </Disclosure.Button>
            </Link>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
