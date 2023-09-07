import React, { useRef, useState } from "react";
import data_ from "@/fakedata/qcm";
import { useRouter } from "next/router";

// let data = data_.filter((value, index) => index < 2)
  let data = data_.sort(() => 0.5 - Math.random())

const QCM = () => {
  const [choice, setChoice] = useState(-1);
  const [canSelect, setCanSelect] = useState(true);
  const [index, setIndex] = useState(0);

  const router = useRouter();
  const score = useRef(0);

  const resetData = () => {
    data = data.sort(() => 0.5 - Math.random())
  }

  const reset = () => {
    setIndex(0); setChoice(-1); score.current = 0;
    resetData();
  }

  return (
    <div>
      {index >= data.length ? (
        <div
          className="m-auto mt-20 border border-black p-4"
          style={{ width: 800, minWidth: 500 }}
        >
          <p className="text-center font-mono text-xl font-bold mb-10">
            Vous avez fini avec un score de : {score.current}/{data.length}
          </p>
          <p className="flex justify-around">
            <button
              className="bg-blue-400 hover:bg-blue-600 p-5 text-white font-bold"
              onClick={() => {resetData(); router.push("/")}}
            >
              Retour à l'accueil
            </button>
            <button
              className="bg-blue-400 hover:bg-blue-600 p-5 text-white font-bold"
              onClick={() => reset()}
            >
              Recommencer
            </button>
          </p>
        </div>
      ) : (
        <div className="m-auto mt-20" style={{ width: 800, minWidth: 500 }}>
          <p className="text-center font-mono text-lg font-bold">
            Score: {score.current}
          </p>
          <p className="text-center font-mono text-lg font-bold underline mb-2">
            Question {index + 1}/{data.length}
          </p>
          <p className="text-center font-mono text-lg font-bold">
            {data[index].question}
          </p>
          <div className="mt-5">
            {data[index].reponses.map((val, ind) => {
              return (
                <div
                  key={ind}
                  className={
                    "p-4 my-4 border hover:border-blue-300 rounded  " +
                    (choice === ind
                      ? canSelect
                        ? "border-blue-500 bg-blue-500"
                        : choice === data[index].indicereponse
                        ? "border-green-700 bg-green-500 text-white"
                        : "border-red-700 bg-red-500 text-white"
                      : canSelect
                      ? "border-gray-300 hover:bg-blue-300"
                      : ind === data[index].indicereponse
                      ? "border-green-500"
                      : "border-gray-300 hover:bg-blue-300")
                  }
                  onClick={() => {
                    if (!canSelect) return;
                    setChoice(() => ind);
                  }}
                >
                  {val}
                </div>
              );
            })}
          </div>
          <p className="mt-10 flex justify-around">
            <button
              className={
                "w-72 rounded p-5 text-white font-bold " +
                (choice < 0 ? "bg-gray-400" : "bg-blue-400 hover:text-xl")
              }
              onClick={() => {
                if (choice < 0) return;
                setCanSelect(false);

                if (choice === data[index].indicereponse)
                  score.current++;

                setTimeout(() => {
                  setIndex(index => index + 1)
                  setCanSelect(true);
                  setChoice(-1);

                }, 1000);

              }}
            >
              Valider
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default QCM;
