"use client";
import { useState } from "react";
import questions from "./components/Question"; 

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showScore, setShowScore] = useState(false);

  const currentQuestion = questions[currentIndex];

  function handleAnswer(answer, index) {
    setSelected(index);
    if (answer.correct) setScore(score + 1);
  }

  function handleNext() {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
    } else {
      setShowScore(true);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowScore(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#001e4d]">
      <div className="bg-white w-11/12 max-w-xl mx-auto rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-[#001e4d] border-b border-gray-700 pb-4">
          Simple Quiz
        </h1>

        {/* Show Score */}
        {showScore ? (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-[#001e4d]">
              You scored {score} out of {questions.length}!
            </h2>
            <button
              onClick={handleRestart}
              className="bg-[#001e4d] text-white px-6 py-2 rounded-md shadow mt-4"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            {/* Question */}
            <h2 className="text-lg font-semibold text-[#001e4d] mt-4">
              {currentIndex + 1}. {currentQuestion.question}
            </h2>

            {/* Answer Buttons */}
            <div className="mt-4 space-y-3">
              {currentQuestion.answers.map((answer, i) => {
                let btnStyle =
                  "w-full border px-4 py-2 rounded-md text-left transition cursor-pointer ";
                if (selected !== null) {
                  if (answer.correct) {
                    btnStyle += "bg-green-300 border-green-500";
                  } else if (selected === i) {
                    btnStyle += "bg-red-300 border-red-500";
                  } else {
                    btnStyle += "bg-white text-gray-500 border-gray-300";
                  }
                } else {
                  btnStyle +=
                    "bg-white text-gray-900 border-gray-800 hover:bg-gray-800 hover:text-white";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(answer, i)}
                    disabled={selected !== null}
                    className={btnStyle}
                  >
                    {answer.text}
                  </button>
                );
              })}
            </div>

            {/* Next + Restart Buttons */}
            <div className="flex gap-4 mt-6">
              {selected !== null && (
                <button
                  onClick={handleNext}
                  className="bg-[#001e4d] text-white px-6 py-2 rounded-md shadow"
                >
                  Next
                </button>
              )}
              <button
                onClick={handleRestart}
                className="bg-[#001e4d] text-white px-6 py-2 rounded-md shadow"
              >
                Restart Quiz
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
