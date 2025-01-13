'use client'

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const HeroHome = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/auth/signin');
  };

  return (
    <section className="relative h-screen flex items-center bg-gradient-to-br from-red-500 via-red-600 to-red-800 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-black/5 backdrop-blur-sm"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <div className="text-white space-y-8 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            <Image
              src="/images/logo/logo-white.png"
              alt="Logo"
              width={176}
              height={60}
            />
            <span className="block opacity-90">Optimize Your</span>
            <span className="block text-red-100">Campus Experience</span>
          </h1>

          <p className="text-lg lg:text-xl text-red-100 opacity-90 max-w-2xl mx-auto lg:mx-0">
            Transform your institution with AI-powered insights for smart classroom scheduling, 
            student distribution, and infrastructure planning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={handleSignIn}
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-600 rounded-full font-semibold text-lg hover:bg-red-50 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Image/Illustration Side */}
        <div className="hidden lg:block relative">
          <div className="relative w-full max-w-xl mx-auto aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-red-400 rounded-full blur-3xl opacity-30" />
            <Image
              src="/images/campus.jpg"
              alt="Campus Management Platform"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
