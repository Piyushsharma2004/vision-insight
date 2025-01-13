import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Signin from "@/components/Auth/Signin";

export const metadata: Metadata = {
  title: "Vision Insight",
  description: "Dashboard for campus management & operations",
};

const SignIn: React.FC = () => {
  return (
    <div className="flex min-h-screen  items-center justify-center bg-gray-50 dark:bg-gray-dark">
      <div className="flex w-full h-[90vh] max-w-6xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-dark-3">
        {/* Left Section (Sign-in Form) */}
        <div className="flex w-full  flex-col p-6 sm:p-12 lg:w-1/2 xl:p-16">
          <Signin />
        </div>

        {/* Right Section (Illustration and Branding) */}
        <div className="hidden w-1/2  bg-gradient-to-br from-red-800 to-red-500 p-12 lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link href="/">
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-white.png"
                alt="Logo"
                width={176}
                height={32}
              />
              <Image
                className="dark:hidden"
                src="/images/logo/logo-white.png"
                alt="Logo"
                width={176}
                height={32}
              />
            </Link>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-xl font-medium text-white">
              Sign in to your account
            </p>
            <h1 className="mb-4 text-3xl font-bold text-white">
              Welcome Back!
            </h1>
            <p className="max-w-sm text-white/80">
              Please sign in to your account by completing the necessary fields
              below.
            </p>
          </div>

          <div className="mt-auto">
            <Image
              src="/images/grids/grid-02.svg"
              alt="Illustration"
              width={405}
              height={325}
              className="mx-auto opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
