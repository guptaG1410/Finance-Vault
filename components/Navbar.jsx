import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <main className="container px-6 py-6 mx-auto">
      <div className="flex items-center justify-between mx-5">
        <div className="flex gap-3 items-center">
          <Image
            className="rounded-full"
            src="/logo.jpeg"
            alt="logo"
            width={50}
            height={50}
          />
          <span className="text-2xl">Sharpe Labs</span>
        </div>
        <div className="flex items-center gap-5">
          <div>Hi! Govind</div>
          <div>
            <button className="btn bg-lime-500 border-lime-500">Log out</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
