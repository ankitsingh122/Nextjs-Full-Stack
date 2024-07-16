"use client";
import { useSession } from "next-auth/react";

function Bgimage() {
    const { data: session } = useSession();

  return (
    <>
      {session ? (
        <div className="text-white text-4xl inset-0 flex justify-center items-center absolute">
          Welcome {session?.user?.name}
        </div>
      ) : (
        <h1></h1>
      )}
    </>
  );
}

export default Bgimage;
