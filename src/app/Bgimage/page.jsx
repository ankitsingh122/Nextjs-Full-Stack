"use client";
import { useSession } from "next-auth/react";

function Bgimage() {
    const { data: session } = useSession();

  return (
    <>
      {session && (
        <div className="text-white text-4xl inset-0 flex justify-center items-center absolute ">
          <div className="bg-black bg-opacity-45 shadow-2xl px-8 py-8 rounded-2xl items-center">Welcome {session?.user?.name}</div>
        </div>
      )}
    </>
  );
}

export default Bgimage;
 