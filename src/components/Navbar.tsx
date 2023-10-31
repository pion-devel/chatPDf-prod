import Link from "next/link";

import { ArrowRight, LogIn } from "lucide-react";

import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="sticky h-14  top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <div className="flex h-14 items-center justify-between border-b border-zinc-200">
        <Link href="/" className="flex z-40 font-bold">
          <Image src="/logo2.png" alt="Logo" width={150} height={50} />
        </Link>

        <div className="hidden items-center space-x-4 sm:flex">
          <>
            <Link href="/pricing" className="">
              Prezzo
            </Link>
            <div className="">Accedi</div>
            <div className="">
              Inizia ora <ArrowRight className="ml-1.5 h-5 w-5" />
            </div>
          </>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
