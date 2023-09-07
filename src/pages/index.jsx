import { useRouter } from "next/router";
import React from "react";

export default function Page() {
  const router = useRouter();
  return (
    <div
      className="m-auto rounded border border-black p-5 mt-20 text-lg"
      style={{ width: 600 }}
    >
      <p className="p-5 mb-20 font-mono text-xl text-center">
        BIENVENU SUR MON SITE DE QCM <br /> <i>&copy; igea 2023</i>
      </p>
      <p className="flex justify-around">
        <button
          className="bg-blue-400 hover:bg-blue-600 p-5 text-white font-bold"
          onClick={() => router.push("/qcm")}
        >
          Commencer
        </button>
      </p>
    </div>
  );
}
